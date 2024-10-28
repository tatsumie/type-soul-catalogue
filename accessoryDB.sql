CREATE TABLE accessories (
    id INT AUTO_INCREMENT PRIMARY KEY, 
    accessory_name VARCHAR(100),
    health INT, 
    defense INT, 
    posture DECIMAL(2,2), 
    reiastu DECIMAL(2,2),
    meter_gain DECIMAL(2,2), 
    reiastu_regen DECIMAL(2,2),
    reduced_meter_drain DECIMAL(2,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
); 