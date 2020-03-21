DO $$BEGIN
  CREATE EXTENSION dblink;
  PERFORM dblink_connect('dbname=' || current_database());
  PERFORM dblink_exec('CREATE DATABASE user_manager');
  PERFORM dblink_exec('CREATE DATABASE user_manager_test');
  CREATE USER appuser WITH PASSWORD 'password';
  GRANT ALL PRIVILEGES ON DATABASE user_manager TO appuser;
  GRANT ALL PRIVILEGES ON DATABASE user_manager_test TO appuser;
END$$;