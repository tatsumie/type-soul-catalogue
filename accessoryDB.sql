CREATE TABLE accessories (
    id INT AUTO_INCREMENT PRIMARY KEY, 
    accessory_name VARCHAR(100),
    health INT, 
    defense INT, 
    posture DECIMAL(5,2), 
    reiatsu DECIMAL(5,2) NOT NULL,
    meter_gain DECIMAL(5,2), 
    reiatsu_regen DECIMAL(5,2) NOT NULL,
    reduced_meter_drain DECIMAL(5,2),
    hierro_pen DECIMAL(5,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
); 