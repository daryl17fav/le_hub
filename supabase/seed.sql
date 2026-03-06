-- INSERT MOCK VILLAGES WITH COORDINATES FOR TESTING
INSERT INTO villages (name, total_points, student_count, map_x, map_y)
VALUES 
  ('Village Alpha', 12500, 45, 20, 30),
  ('Lagos Hub', 11800, 32, 60, 20),
  ('Kano Village', 10200, 58, 40, 50),
  ('Port Harcourt', 9500, 25, 75, 60),
  ('Abuja Center', 8900, 40, 15, 70)
ON CONFLICT (name) DO UPDATE SET
  total_points = EXCLUDED.total_points,
  student_count = EXCLUDED.student_count,
  map_x = EXCLUDED.map_x,
  map_y = EXCLUDED.map_y;
