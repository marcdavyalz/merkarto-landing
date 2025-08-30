-- Supabase Database Setup for Okulus Waitlist
-- Run this SQL in your Supabase SQL Editor

-- Create waitlist table
CREATE TABLE waitlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  country VARCHAR(100) NOT NULL,
  age_range VARCHAR(20) NOT NULL,
  investor_type VARCHAR(50) NOT NULL,
  ticket_size VARCHAR(20) NOT NULL,
  investment_interests TEXT[] DEFAULT '{}', -- Array of interests
  motivation TEXT[] DEFAULT '{}', -- Array of motivations
  referred_by VARCHAR(255),
  position INTEGER NOT NULL,
  language VARCHAR(10) DEFAULT 'en',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_waitlist_email ON waitlist(email);
CREATE INDEX idx_waitlist_position ON waitlist(position);
CREATE INDEX idx_waitlist_created_at ON waitlist(created_at);
CREATE INDEX idx_waitlist_country ON waitlist(country);
CREATE INDEX idx_waitlist_investor_type ON waitlist(investor_type);

-- Enable Row Level Security (RLS)
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Create policy for inserting (anyone can register)
CREATE POLICY "Anyone can insert waitlist entries" ON waitlist
  FOR INSERT WITH CHECK (true);

-- Create policy for reading (only authenticated users/admin can view full list)
CREATE POLICY "Only authenticated users can view waitlist" ON waitlist
  FOR SELECT USING (auth.role() = 'authenticated');

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_waitlist_updated_at 
    BEFORE UPDATE ON waitlist 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Optional: Create a view for analytics (without sensitive data)
CREATE VIEW waitlist_analytics AS
SELECT 
    country,
    age_range,
    investor_type,
    ticket_size,
    investment_interests,
    motivation,
    language,
    DATE(created_at) as registration_date,
    COUNT(*) as registrations
FROM waitlist
GROUP BY country, age_range, investor_type, ticket_size, investment_interests, motivation, language, DATE(created_at);

-- Grant access to the analytics view for authenticated users
GRANT SELECT ON waitlist_analytics TO authenticated;
