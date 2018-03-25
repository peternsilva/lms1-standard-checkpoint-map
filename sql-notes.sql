SELECT DISTINCT
units.id AS unit_id,
units.position AS unit_position,
units.title AS unit_title,
content_files.id AS content_file_id,
standards.id AS standard_id,
standards.description AS standard_desc

FROM units
INNER JOIN unit_files ON units.id=unit_files.unit_id
INNER JOIN content_files ON unit_files.content_file_id = content_files.id
INNER JOIN content_file_challenges ON content_files.id = content_file_challenges.content_file_id
INNER JOIN challenges ON content_file_challenges.challenge_id = challenges.id
INNER JOIN challenge_standards ON challenges.id = challenge_standards.challenge_id
INNER JOIN standards ON challenge_standards.standard_id = standards.id

WHERE
units.cohort_id=372 AND
unit_files.unit_file_type='Checkpoint' AND
standards.id=14452

ORDER BY unit_position
;
