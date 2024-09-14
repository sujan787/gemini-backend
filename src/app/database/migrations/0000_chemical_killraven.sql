CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"email" varchar(255) NOT NULL,
	"password" varchar(300),
	"google_id" varchar(300),
	"github_id" varchar(300),
	"email_verified" timestamp,
	"verify_token" varchar(300),
	"reset_password_token" varchar(300),
	"reset_password_expires" timestamp,
	"image" varchar(255),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
