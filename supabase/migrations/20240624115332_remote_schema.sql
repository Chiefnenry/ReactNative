-- Policies for storage objects
CREATE POLICY "Allow authenticated users to SELECT and INSERT 16wiy3a_0"
ON "storage"."objects"
AS permissive
FOR SELECT
TO authenticated
USING ((bucket_id = 'product-images'::text));

CREATE POLICY "Allow authenticated users to SELECT and INSERT 16wiy3a_1"
ON "storage"."objects"
AS permissive
FOR insert
TO authenticated
WITH CHECK ((bucket_id = 'product-images'::text));

CREATE POLICY "Anyone can upload an avatar."
ON "storage"."objects"
AS permissive
FOR insert
TO public
WITH CHECK ((bucket_id = 'avatars'::text));

CREATE POLICY "Avatar images are publicly accessible."
ON "storage"."objects"
AS permissive
FOR SELECT
TO public
USING ((bucket_id = 'avatars'::text));