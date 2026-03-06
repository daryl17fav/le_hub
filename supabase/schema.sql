-- ENABLE THE UUID EXTENSION
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. VILLAGES (The Competition)
CREATE TABLE villages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT UNIQUE NOT NULL,
  total_points BIGINT DEFAULT 0,
  student_count INT DEFAULT 0,
  map_x INT DEFAULT 0,
  map_y INT DEFAULT 0
);

-- 2. ACCOUNTS (One per SIM Card)
CREATE TABLE accounts (
  phone_number TEXT PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. PROFILES (The Family Members)
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  account_id TEXT REFERENCES accounts(phone_number) ON DELETE CASCADE,
  village_id UUID REFERENCES villages(id),
  full_name TEXT NOT NULL,
  role TEXT CHECK (role IN ('junior', 'adult')),
  avatar_url TEXT,
  points BIGINT DEFAULT 0,
  streak INT DEFAULT 0,
  badges_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RPC Functions for Points (Required by Service)
CREATE OR REPLACE FUNCTION increment_profile_points(row_id UUID, val INT)
RETURNS void LANGUAGE plpgsql AS $$
BEGIN
  UPDATE profiles SET points = points + val WHERE id = row_id;
END;
$$;

CREATE OR REPLACE FUNCTION increment_village_points(row_id UUID, val INT)
RETURNS void LANGUAGE plpgsql AS $$
BEGIN
  UPDATE villages SET total_points = total_points + val WHERE id = row_id;
END;
$$;

-- 4. LESSON PROGRESS (Tracking completions)
CREATE TABLE lesson_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  lesson_id TEXT NOT NULL,
  score INT DEFAULT 0,
  completed_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(profile_id, lesson_id)
);

-- RPC Function for Lesson Completion (Required by LessonService)
CREATE OR REPLACE FUNCTION complete_lesson_stats(p_id UUID, v_id UUID, stars_to_add INT)
RETURNS void LANGUAGE plpgsql AS $$
BEGIN
  -- Increment Profile Points
  UPDATE profiles SET points = points + stars_to_add WHERE id = p_id;
  -- Increment Village Points
  UPDATE villages SET total_points = total_points + stars_to_add WHERE id = v_id;
END;
$$;

-- Transaction-Safe Lesson Completion (Atomic)
CREATE OR REPLACE FUNCTION complete_lesson_transaction(
  p_id UUID, 
  v_id UUID, 
  l_id TEXT, 
  stars_earned INT
)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  -- 1. Check for duplicates (only reward stars once)
  IF EXISTS (SELECT 1 FROM lesson_progress WHERE profile_id = p_id AND lesson_id = l_id) THEN
    RETURN;
  END IF;

  -- 2. Increment Points (Both tables) and Lessons Finished
  UPDATE profiles 
  SET 
    points = points + stars_earned,
    lessons_finished = COALESCE(lessons_finished, 0) + 1
  WHERE id = p_id;

  UPDATE villages SET total_points = total_points + stars_earned WHERE id = v_id;

  -- 3. Log the completion
  INSERT INTO lesson_progress (profile_id, lesson_id, score)
  VALUES (p_id, l_id, stars_earned);
END;
$$;
