// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod file_manager;

use std::collections::HashMap;
use std::fs;
use std::fs::{OpenOptions};
use std::io::{Write};
use serde::Serialize;
use serde_json::{Map, Value};

#[derive(Serialize)]
struct Curve {
    label: String,
    data: HashMap<i32,i32>,
}

#[tauri::command]
fn add_game_data(game_record: String) -> String {
    let date = std::time::SystemTime::now()
        .duration_since(std::time::UNIX_EPOCH)
        .unwrap()
        .as_secs()
        .to_string();

    let path_string = format!("game_data/game_records/{}.json", date);
    let path = std::path::Path::new(path_string.as_str());

    let mut file = OpenOptions::new()
        .create(true)
        .write(true)
        .open(path)
        .expect("Unable to create file");

    file.write_all(game_record.as_bytes()).expect("Unable to write data");

    format!("Game data added successfully")
}

#[tauri::command]
fn get_game_data() -> String{

    let paths = fs::read_dir("game_data/game_records").unwrap();
    
    let mut additions: HashMap<i32, Vec<i32>> = HashMap::new();
    let mut subtractions: HashMap<i32, Vec<i32>> = HashMap::new();
    let mut multiplications: HashMap<i32, Vec<i32>> = HashMap::new();
    let mut divisions: HashMap<i32, Vec<i32>> = HashMap::new();

    for path in paths {

        let path = path.unwrap();
        let file = OpenOptions::new()
            .read(true)
            .open(path.path())
            .expect("failed to open game_records");

        let map: Map<String, Value> = serde_json::from_reader(file).expect("Failed to map to json");

        let equations = map.get("equations").unwrap().as_array().unwrap();

        for equation in equations {
            let equation = equation.as_object().unwrap();
            if !equation.get("correct").unwrap().as_bool().unwrap() {
                continue;
            }

            let level = equation.get("level").unwrap().as_i64().unwrap() as i32;
            let duration = equation.get("duration").unwrap().as_i64().unwrap() as i32;

            let operation_type = equation.get("equation").unwrap().get("operationType").unwrap().as_str().unwrap();
            let array_to_increment = match operation_type {
                "addition" => &mut additions,
                "subtraction" => &mut subtractions,
                "multiplication" => &mut multiplications,
                "division" => &mut divisions,
                _ => &mut additions
            };

            let entry = array_to_increment.get_mut(&level);
            match entry {
                Some(x) => x.push(duration),
                None => {
                    let mut new_vec = Vec::new();
                    new_vec.push(duration);
                    array_to_increment.insert(level, new_vec);
                }
            }
        }
    }

    let curve_additions = Curve {
        label: String::from("Additions"),
        data: get_average_duration_per_level(additions),
    };

    let curve_subtractions = Curve {
        label: String::from("Subtractions"),
        data: get_average_duration_per_level(subtractions),
    };

    let curve_multiplications = Curve {
        label: String::from("Multiplications"),
        data: get_average_duration_per_level(multiplications),
    };

    let curve_divisions = Curve {
        label: String::from("Divisions"),
        data: get_average_duration_per_level(divisions),
    };

    format!("[{}, {}, {}, {}]", serde_json::to_string(&curve_additions).unwrap(), serde_json::to_string(&curve_subtractions).unwrap(), serde_json::to_string(&curve_multiplications).unwrap(), serde_json::to_string(&curve_divisions).unwrap())
}

fn get_average_duration_per_level(list: HashMap<i32, Vec<i32>>)-> HashMap<i32,i32>{
    let mut average_duration_per_level: HashMap<i32, i32> = HashMap::new();

    for (level, durations) in list {
        let mut sum = 0;
        for duration in &durations {
            sum += duration;
        }
        average_duration_per_level.insert(level, sum / durations.len() as i32);
    }

    average_duration_per_level
    
}

fn main() {
    init_game_data_directory();

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            add_game_data,
            get_game_data
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

fn init_game_data_directory() {

    let folders = ["game_records"];
    let new_dir = std::path::Path::new("game_data");
    if !new_dir.exists() {
        std::fs::create_dir(new_dir).expect("Unable to create directory");

        for op in folders {
            let new_dir = std::path::Path::new("game_data").join(op);
            std::fs::create_dir(new_dir).expect("Unable to create directory");
        }
    }
}