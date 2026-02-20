-- INSERT MOCK VILLAGE FOR TESTING
INSERT INTO villages (name) VALUES ('Village Ouidah'), ('Village Kunda'), ('Village Alpha')
ON CONFLICT (name) DO NOTHING;
