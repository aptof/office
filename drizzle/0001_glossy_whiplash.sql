CREATE TABLE `everification_case` (
	`pan_tan` text NOT NULL,
	`type_id` integer NOT NULL,
	`year` integer NOT NULL,
	`status_id` text NOT NULL,
	`id` text PRIMARY KEY NOT NULL,
	FOREIGN KEY (`pan_tan`) REFERENCES `pan_tan`(`pan`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`type_id`) REFERENCES `everification_case_type`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`status_id`) REFERENCES `everification_case_status`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `everification_case_status` (
	`id` text PRIMARY KEY NOT NULL,
	`description` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `everification_case_type` (
	`id` integer PRIMARY KEY NOT NULL,
	`type` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `pan_tan` (
	`pan` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`is_pan` integer DEFAULT true NOT NULL,
	`linked` text,
	FOREIGN KEY (`linked`) REFERENCES `pan_tan`(`pan`) ON UPDATE no action ON DELETE no action
);
