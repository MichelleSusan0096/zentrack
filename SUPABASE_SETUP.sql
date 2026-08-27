-- Create login_records table
CREATE TABLE IF NOT EXISTS login_records (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  auth_method TEXT NOT NULL,
  role TEXT DEFAULT 'trainee',
  login_time TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  logout_time TIMESTAMP WITH TIME ZONE,
  status TEXT DEFAULT 'success',
  error_message TEXT,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create RLS policies for login_records
ALTER TABLE login_records ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert login records
CREATE POLICY "Anyone can insert login records" ON login_records
  FOR INSERT WITH CHECK (true);

-- Allow authenticated users to read their own login records
CREATE POLICY "Users can read their own login records" ON login_records
  FOR SELECT USING (user_id = auth.uid());

-- Allow admins to read all login records
CREATE POLICY "Admins can read all login records" ON login_records
  FOR SELECT USING (EXISTS (
    SELECT 1 FROM auth.users 
    WHERE auth.users.id = auth.uid() 
    AND auth.users.raw_user_meta_data->>'role' = 'admin'
  ));

-- Create index on email for faster queries
CREATE INDEX idx_login_records_email ON login_records(email);
CREATE INDEX idx_login_records_user_id ON login_records(user_id);
CREATE INDEX idx_login_records_login_time ON login_records(login_time);

-- Create a view for analytics
CREATE OR REPLACE VIEW login_analytics AS
SELECT 
  auth_method,
  COUNT(*) as total_logins,
  COUNT(CASE WHEN status = 'success' THEN 1 END) as successful_logins,
  COUNT(CASE WHEN status = 'failed' THEN 1 END) as failed_logins,
  COUNT(DISTINCT user_id) as unique_users,
  DATE(login_time) as login_date
FROM login_records
GROUP BY auth_method, DATE(login_time);
