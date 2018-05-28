CREATE TABLE
IF NOT EXISTS currencies
(
  id SERIAL PRIMARY KEY,
  name VARCHAR
(255) NOT NULL,
  rate REAL,
  last_update_at DATE NOT NULL
);
CREATE TABLE
IF NOT EXISTS tracker
(
  id SERIAL PRIMARY KEY,
  currency1_id INTEGER NOT NULL REFERENCES currencies
(id),
  currency2_id INTEGER NOT NULL REFERENCES currencies
(id),
  current_exchange_level REAL NOT NULL
);
CREATE TABLE
IF NOT EXISTS tracker_level
(
  id SERIAL PRIMARY KEY,
  tracker_id INTEGER NOT NULL REFERENCES tracker
(id),
  alert_level REAL NOT NULL
);