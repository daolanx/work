CREATE TABLE "creemSubscription" (
	"id" text PRIMARY KEY NOT NULL,
	"productId" text NOT NULL,
	"referenceId" text,
	"creemCustomerId" text,
	"creemSubscriptionId" text,
	"creemOrderId" text,
	"status" text NOT NULL,
	"periodStart" timestamp,
	"periodEnd" timestamp,
	"cancelAtPeriodEnd" boolean DEFAULT false,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
