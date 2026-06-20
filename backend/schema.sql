CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_users_email ON users(email);

CREATE TABLE trades (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    symbol VARCHAR(32) NOT NULL,
    side VARCHAR(10) NOT NULL,
    entry_price NUMERIC(14, 4) NOT NULL,
    exit_price NUMERIC(14, 4),
    stop_loss NUMERIC(14, 4),
    take_profit NUMERIC(14, 4),
    profit_loss NUMERIC(14, 4),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_trades_user_id ON trades(user_id);
CREATE INDEX idx_trades_symbol ON trades(symbol);

CREATE TABLE journal (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    emotion VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_journal_user_id ON journal(user_id);

CREATE TABLE risk_settings (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    daily_risk NUMERIC(5, 2) NOT NULL DEFAULT 0,
    weekly_risk NUMERIC(5, 2) NOT NULL DEFAULT 0,
    max_drawdown NUMERIC(5, 2) NOT NULL DEFAULT 0
);

CREATE INDEX idx_risk_settings_user_id ON risk_settings(user_id);

CREATE TABLE goals (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    goal_name VARCHAR(255) NOT NULL,
    target_value NUMERIC(14, 4) NOT NULL,
    current_value NUMERIC(14, 4) NOT NULL DEFAULT 0,
    status VARCHAR(50) NOT NULL DEFAULT 'active'
);

CREATE INDEX idx_goals_user_id ON goals(user_id);

CREATE TABLE alerts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    message TEXT NOT NULL,
    type VARCHAR(50) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_alerts_user_id ON alerts(user_id);

CREATE TABLE performance (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    win_rate NUMERIC(5, 2) NOT NULL DEFAULT 0,
    profit_factor NUMERIC(10, 4) NOT NULL DEFAULT 0,
    drawdown NUMERIC(5, 2) NOT NULL DEFAULT 0,
    total_profit NUMERIC(14, 4) NOT NULL DEFAULT 0
);

CREATE INDEX idx_performance_user_id ON performance(user_id);

CREATE TABLE lessons (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE TABLE lesson_progress (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    lesson_id INTEGER NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
    progress NUMERIC(5, 2) NOT NULL DEFAULT 0,
    completed BOOLEAN NOT NULL DEFAULT FALSE,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_lessons_category ON lessons(category);
CREATE INDEX idx_lesson_progress_user_id ON lesson_progress(user_id);
CREATE INDEX idx_lesson_progress_lesson_id ON lesson_progress(lesson_id);

CREATE TABLE trade_journal (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    symbol VARCHAR(32) NOT NULL,
    side VARCHAR(10) NOT NULL,
    entry_price NUMERIC(14, 4) NOT NULL,
    exit_price NUMERIC(14, 4),
    quantity INTEGER NOT NULL DEFAULT 1,
    stop_loss NUMERIC(14, 4),
    take_profit NUMERIC(14, 4),
    profit_loss NUMERIC(14, 4),
    rr_ratio NUMERIC(5, 2),
    notes TEXT,
    emotion VARCHAR(50),
    screenshot_url VARCHAR(512),
    trade_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_trade_journal_user_id ON trade_journal(user_id);
CREATE INDEX idx_trade_journal_symbol ON trade_journal(symbol);
CREATE INDEX idx_trade_journal_trade_date ON trade_journal(trade_date);
