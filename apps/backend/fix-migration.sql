-- Fix migrations for OTP phone number change

-- Create migrations table if it doesn't exist
CREATE TABLE IF NOT EXISTS migrations (
    id SERIAL PRIMARY KEY,
    timestamp BIGINT NOT NULL,
    name VARCHAR(255) NOT NULL
);

-- Mark initial schema migration as executed
INSERT INTO migrations (timestamp, name)
VALUES (1735541000000, 'InitialSchema1735541000000')
ON CONFLICT DO NOTHING;

-- Rename email column to phone in codes table
ALTER TABLE codes RENAME COLUMN email TO phone;

-- Mark the column rename migration as executed
INSERT INTO migrations (timestamp, name)
VALUES (1735541100000, 'ChangeCodesEmailToPhone1735541100000');

-- Verify the change
SELECT 'Migration completed successfully!' AS status;
SELECT * FROM migrations ORDER BY timestamp;
