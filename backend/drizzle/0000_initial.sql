CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "btree_gist";

DO $$ BEGIN
  CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'completed', 'cancelled');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE location_type AS ENUM ('home', 'salon');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name varchar(160) NOT NULL,
  slug varchar(180) NOT NULL,
  description varchar(800) NOT NULL,
  category varchar(120) NOT NULL,
  duration_minutes integer NOT NULL CHECK (duration_minutes > 0),
  price_from integer NOT NULL CHECK (price_from >= 0),
  image_url varchar(800),
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS services_slug_unique ON services (slug);

CREATE TABLE IF NOT EXISTS business_hours (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  day_of_week integer NOT NULL CHECK (day_of_week BETWEEN 0 AND 6),
  open_time time NOT NULL,
  close_time time NOT NULL,
  is_open boolean NOT NULL DEFAULT true,
  CONSTRAINT business_hours_valid_time CHECK (open_time < close_time)
);

CREATE UNIQUE INDEX IF NOT EXISTS business_hours_day_unique ON business_hours (day_of_week);

CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name varchar(160) NOT NULL,
  phone varchar(40) NOT NULL,
  email varchar(240),
  service_id uuid NOT NULL REFERENCES services(id) ON DELETE RESTRICT,
  location_type location_type NOT NULL,
  appointment_date date NOT NULL,
  start_time time NOT NULL,
  end_time time NOT NULL,
  address varchar(500),
  occasion varchar(160),
  notes varchar(1200),
  status booking_status NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT bookings_valid_time CHECK (start_time < end_time),
  CONSTRAINT bookings_home_address CHECK (location_type <> 'home' OR address IS NOT NULL)
);

CREATE INDEX IF NOT EXISTS bookings_date_status_idx ON bookings (appointment_date, status);
CREATE INDEX IF NOT EXISTS bookings_service_idx ON bookings (service_id);

DO $$ BEGIN
  ALTER TABLE bookings ADD CONSTRAINT bookings_no_time_overlap
  EXCLUDE USING gist (
    appointment_date WITH =,
    tsrange((appointment_date + start_time), (appointment_date + end_time), '[)') WITH &&
  )
  WHERE (status IN ('pending', 'confirmed'));
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

CREATE TABLE IF NOT EXISTS blocked_times (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  date date NOT NULL,
  start_time time NOT NULL,
  end_time time NOT NULL,
  reason varchar(400),
  CONSTRAINT blocked_times_valid_time CHECK (start_time < end_time)
);

CREATE INDEX IF NOT EXISTS blocked_times_date_idx ON blocked_times (date);

CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name varchar(160) NOT NULL,
  message varchar(1000) NOT NULL,
  rating integer NOT NULL CHECK (rating BETWEEN 1 AND 5),
  occasion varchar(160)
);

CREATE TABLE IF NOT EXISTS gallery_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title varchar(160) NOT NULL,
  category varchar(120) NOT NULL,
  image_url varchar(800) NOT NULL,
  alt_text varchar(400) NOT NULL
);

INSERT INTO services (id, name, slug, description, category, duration_minutes, price_from, image_url, active)
VALUES
  ('10000000-0000-4000-8000-000000000001', 'Signature Hair Styling', 'signature-hair-styling', 'Elegant styling for interviews, date nights, photoshoots, and everyday confidence.', 'Hair', 90, 4500, 'https://placehold.co/900x1100/f7efe8/4b342a?text=Hair+Styling', true),
  ('10000000-0000-4000-8000-000000000002', 'Braids', 'braids', 'Neat protective braids shaped with patience, polish, and long-wear comfort.', 'Hair', 180, 6500, 'https://placehold.co/900x1100/f3d9d1/4b342a?text=Braids', true),
  ('10000000-0000-4000-8000-000000000003', 'Natural Hair Styling', 'natural-hair-styling', 'Soft, healthy styling for coils, curls, twists, and natural hair care routines.', 'Hair', 120, 5000, 'https://placehold.co/900x1100/faf5ef/4b342a?text=Natural+Hair', true),
  ('10000000-0000-4000-8000-000000000004', 'Bridal Hair', 'bridal-hair', 'Calm, premium bridal styling for weddings, introductions, and special ceremonies.', 'Bridal', 150, 12000, 'https://placehold.co/900x1100/fff7f2/4b342a?text=Bridal+Hair', true),
  ('10000000-0000-4000-8000-000000000005', 'Wig and Weave Styling', 'wig-weave-styling', 'Installation, shaping, and finishing for wigs and weaves with a natural look.', 'Hair', 120, 7000, 'https://placehold.co/900x1100/f1dfd3/4b342a?text=Wigs+%26+Weaves', true),
  ('10000000-0000-4000-8000-000000000006', 'Manicure', 'manicure', 'Clean shaping, cuticle care, polish, and refined finishing for hands.', 'Nails', 60, 2500, 'https://placehold.co/900x1100/f4cfc9/4b342a?text=Manicure', true),
  ('10000000-0000-4000-8000-000000000007', 'Pedicure', 'pedicure', 'Relaxing foot care, nail shaping, scrub, and polished finishing.', 'Nails', 75, 3000, 'https://placehold.co/900x1100/efd8c8/4b342a?text=Pedicure', true),
  ('10000000-0000-4000-8000-000000000008', 'Face Scrub and Facial', 'face-scrub-facial', 'A gentle cleanse, scrub, and facial glow care for fresh, camera-ready skin.', 'Skin Care', 75, 3500, 'https://placehold.co/900x1100/faeee9/4b342a?text=Facial', true),
  ('10000000-0000-4000-8000-000000000009', 'Leg Washing and Scrubbing', 'leg-washing-scrubbing', 'Detailed leg and foot refresh with washing, exfoliation, and soft-care finishing.', 'Body Care', 60, 2800, 'https://placehold.co/900x1100/f8e9dd/4b342a?text=Leg+Care', true),
  ('10000000-0000-4000-8000-000000000010', 'Children''s Hair and Beauty Care', 'childrens-hair-beauty-care', 'Gentle, patient, efficient care for children with calm handling and kind reassurance.', 'Children', 90, 3500, 'https://placehold.co/900x1100/fde8ec/4b342a?text=Children%27s+Care', true),
  ('10000000-0000-4000-8000-000000000011', 'Home Visit Beauty Service', 'home-visit-beauty-service', 'Door-to-door beauty care for busy clients who want salon-quality service at home.', 'Home Visit', 120, 6000, 'https://placehold.co/900x1100/fff8f0/4b342a?text=Home+Visit', true)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO business_hours (day_of_week, open_time, close_time, is_open)
VALUES
  (0, '10:00', '14:00', false),
  (1, '08:30', '18:00', true),
  (2, '08:30', '18:00', true),
  (3, '08:30', '18:00', true),
  (4, '08:30', '18:00', true),
  (5, '08:30', '18:00', true),
  (6, '09:00', '16:00', true)
ON CONFLICT (day_of_week) DO NOTHING;

INSERT INTO testimonials (name, message, rating, occasion)
VALUES
  ('Amina K.', 'She arrived early, handled my bridal hair calmly, and kept the whole morning peaceful.', 5, 'Wedding'),
  ('Grace M.', 'My daughter usually gets restless, but she was patient, gentle, and finished beautifully.', 5, 'Children''s care'),
  ('Claire T.', 'The home visit manicure and facial felt premium without needing to leave my house.', 5, 'Home visit'),
  ('Nia R.', 'My interview style was clean, professional, and lasted all day.', 5, 'Interview')
ON CONFLICT DO NOTHING;

INSERT INTO gallery_items (title, category, image_url, alt_text)
VALUES
  ('Polished bridal finish', 'Bridal', 'https://placehold.co/900x1100/fff4ef/4b342a?text=Black+Bride+Styling', 'Placeholder portrait of a Black bride with elegant salon hair styling'),
  ('Soft curls for an occasion', 'Hair', 'https://placehold.co/900x1100/f6ded5/4b342a?text=White+Client+Hair', 'Placeholder portrait of a white client with soft occasion curls'),
  ('Mixed-race client glow styling', 'Hair', 'https://placehold.co/900x1100/f3e4da/4b342a?text=Mixed-race+Client', 'Placeholder portrait of a mixed-race client with warm beauty styling'),
  ('Gentle child styling', 'Children', 'https://placehold.co/900x1100/fde9ef/4b342a?text=Child+Hair+Care', 'Placeholder image of a child receiving gentle hair care'),
  ('Rose manicure detail', 'Nails', 'https://placehold.co/900x1100/f4c9c6/4b342a?text=Nails', 'Placeholder close-up of elegant rose toned nails'),
  ('Fresh facial care', 'Skin Care', 'https://placehold.co/900x1100/faeee9/4b342a?text=Facial+Care', 'Placeholder image of a client receiving a face scrub and facial'),
  ('Leg and foot refresh', 'Body Care', 'https://placehold.co/900x1100/f8e8dc/4b342a?text=Leg+%26+Foot+Care', 'Placeholder image for leg washing, leg scrubbing, and foot care'),
  ('Doorstep salon setup', 'Home Visit', 'https://placehold.co/900x1100/fff8f0/4b342a?text=Home+Visit+Salon', 'Placeholder image of a tidy home visit beauty setup')
ON CONFLICT DO NOTHING;
