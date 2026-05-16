import type { Pool } from "pg";

export async function seedDatabase(pool: Pool) {
  await pool.query(`
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
    ON CONFLICT (slug) DO UPDATE SET
      name = excluded.name,
      description = excluded.description,
      category = excluded.category,
      duration_minutes = excluded.duration_minutes,
      price_from = excluded.price_from,
      image_url = excluded.image_url,
      active = excluded.active;
  `);

  await pool.query(`
    INSERT INTO business_hours (day_of_week, open_time, close_time, is_open)
    VALUES
      (0, '10:00', '14:00', false),
      (1, '08:30', '18:00', true),
      (2, '08:30', '18:00', true),
      (3, '08:30', '18:00', true),
      (4, '08:30', '18:00', true),
      (5, '08:30', '18:00', true),
      (6, '09:00', '16:00', true)
    ON CONFLICT (day_of_week) DO UPDATE SET
      open_time = excluded.open_time,
      close_time = excluded.close_time,
      is_open = excluded.is_open;
  `);

  await pool.query(`
    INSERT INTO testimonials (name, message, rating, occasion)
    SELECT value.name, value.message, value.rating, value.occasion
    FROM (
      VALUES
        ('Amina K.', 'She arrived early, handled my bridal hair calmly, and kept the whole morning peaceful.', 5, 'Wedding'),
        ('Grace M.', 'My daughter usually gets restless, but she was patient, gentle, and finished beautifully.', 5, 'Children''s care'),
        ('Claire T.', 'The home visit manicure and facial felt premium without needing to leave my house.', 5, 'Home visit'),
        ('Nia R.', 'My interview style was clean, professional, and lasted all day.', 5, 'Interview')
    ) AS value(name, message, rating, occasion)
    WHERE NOT EXISTS (
      SELECT 1 FROM testimonials
      WHERE testimonials.name = value.name
        AND testimonials.occasion = value.occasion
    );
  `);

  await pool.query(`
    INSERT INTO gallery_items (title, category, image_url, alt_text)
    SELECT value.title, value.category, value.image_url, value.alt_text
    FROM (
      VALUES
        ('Polished bridal finish', 'Bridal', 'https://placehold.co/900x1100/fff4ef/4b342a?text=Black+Bride+Styling', 'Placeholder portrait of a Black bride with elegant salon hair styling'),
        ('Soft curls for an occasion', 'Hair', 'https://placehold.co/900x1100/f6ded5/4b342a?text=White+Client+Hair', 'Placeholder portrait of a white client with soft occasion curls'),
        ('Mixed-race client glow styling', 'Hair', 'https://placehold.co/900x1100/f3e4da/4b342a?text=Mixed-race+Client', 'Placeholder portrait of a mixed-race client with warm beauty styling'),
        ('Gentle child styling', 'Children', 'https://placehold.co/900x1100/fde9ef/4b342a?text=Child+Hair+Care', 'Placeholder image of a child receiving gentle hair care'),
        ('Rose manicure detail', 'Nails', 'https://placehold.co/900x1100/f4c9c6/4b342a?text=Nails', 'Placeholder close-up of elegant rose toned nails'),
        ('Fresh facial care', 'Skin Care', 'https://placehold.co/900x1100/faeee9/4b342a?text=Facial+Care', 'Placeholder image of a client receiving a face scrub and facial'),
        ('Leg and foot refresh', 'Body Care', 'https://placehold.co/900x1100/f8e8dc/4b342a?text=Leg+%26+Foot+Care', 'Placeholder image for leg washing, leg scrubbing, and foot care'),
        ('Doorstep salon setup', 'Home Visit', 'https://placehold.co/900x1100/fff8f0/4b342a?text=Home+Visit+Salon', 'Placeholder image of a tidy home visit beauty setup')
    ) AS value(title, category, image_url, alt_text)
    WHERE NOT EXISTS (
      SELECT 1 FROM gallery_items
      WHERE gallery_items.title = value.title
        AND gallery_items.category = value.category
    );
  `);
}
