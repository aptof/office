PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_insight_status` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_insight_status`("id", "name", "updated_at") SELECT "id", "name", "updated_at" FROM `insight_status`;--> statement-breakpoint
DROP TABLE `insight_status`;--> statement-breakpoint
ALTER TABLE `__new_insight_status` RENAME TO `insight_status`;--> statement-breakpoint
PRAGMA foreign_keys=ON;