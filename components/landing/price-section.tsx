"use client";

import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { CheckCircleIcon } from "lucide-react";
import Link from "next/link";

type Tab = "monthly" | "yearly";

export const PLANS = [
  {
    name: "Free",
    info: "For most individuals",
    price: {
      monthly: 0,
      yearly: 0,
    },
    features: [
      { text: "Shorten links" },
      { text: "Up to 100 tags", limit: "100 tags" },
      { text: "Customizable branded links" },
      { text: "Track clicks", tooltip: "1K clicks/month" },
      {
        text: "Community support",
        tooltip: "Get answers your questions on discord",
      },
      {
        text: "AI powered suggestions",
        tooltip: "Get up to 100 AI powered suggestions",
      },
    ],
    btn: {
      text: "Start for free",
      href: "/auth/sign-up?plan=free",
      variant: "default",
    },
  },
  {
    name: "Pro",
    info: "For small businesses",
    price: {
      monthly: 9,
      yearly: Math.round(9 * 12 * (1 - 0.12)),
    },
    features: [
      { text: "Shorten links" },
      { text: "Up to 500 tags", limit: "500 tags" },
      { text: "Customizable branded links" },
      { text: "Track clicks", tooltip: "20K clicks/month" },
      { text: "Export click data", tooltip: "Upto 1K links" },
      { text: "Priority support", tooltip: "Get 24/7 chat support" },
      {
        text: "AI powered suggestions",
        tooltip: "Get up to 500 AI powered suggestions",
      },
    ],
    btn: {
      text: "Get started",
      href: "/auth/sign-up?plan=pro",
      variant: "purple",
    },
  },
  {
    name: "Business",
    info: "For large organizations",
    price: {
      monthly: 49,
      yearly: Math.round(49 * 12 * (1 - 0.12)),
    },
    features: [
      { text: "Shorten links" },
      { text: "Unlimited tags" },
      { text: "Customizable branded links" },
      { text: "Track clicks", tooltip: "Unlimited clicks" },
      { text: "Export click data", tooltip: "Unlimited clicks" },
      {
        text: "Dedicated manager",
        tooltip: "Get priority support from our team",
      },
      {
        text: "AI powered suggestions",
        tooltip: "Get unlimited AI powered suggestions",
      },
    ],
    btn: {
      text: "Contact team",
      href: "/auth/sign-up?plan=business",
      variant: "default",
    },
  },
];

const PricingCards = () => {
  return (<section>
    <Tabs
      defaultValue="monthly"
      className="w-full flex flex-col items-center justify-center"
    >
      <TabsList>
        <TabsTrigger value="monthly">monthly</TabsTrigger>
        <TabsTrigger value="yearly">yearly</TabsTrigger>
      </TabsList>

      <TabsContent
        value="monthly"
        className="grid grid-cols-1 lg:grid-cols-3 gap-5 w-full md:gap-8 flex-wrap max-w-5xl mx-auto pt-6  "
      >
        {PLANS.map((plan) => (
          <Card
            key={plan.name}
            className={cn(plan.name === "Pro" && "border-2 border-purple-500")}
          >
            <CardHeader
              className={cn(
                "border-b border-border",
                plan.name === "Pro"
                  ? "bg-purple-500/[0.08]"
                  : "bg-foreground/[0.03]"
              )}
            >
              <CardTitle
                className={cn(
                  plan.name !== "Pro" && "text-muted-foreground",
                  "text-lg font-medium"
                )}
              >
                {plan.name}
              </CardTitle>
              <CardDescription>{plan.info}</CardDescription>
              <h5 className="text-3xl font-semibold">
                ${plan.price.monthly}
                <span className="text-base text-muted-foreground font-normal">
                  {plan.name !== "Free" ? "/month" : ""}
                </span>
              </h5>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              {plan.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircleIcon className="text-purple-500 w-4 h-4" />
                  <TooltipProvider>
                    <Tooltip delayDuration={0}>
                      <TooltipTrigger asChild>
                        <p
                          className={cn(
                            feature.tooltip &&
                              "border-b !border-dashed border-border cursor-pointer"
                          )}
                        >
                          {feature.text}
                        </p>
                      </TooltipTrigger>
                      {feature.tooltip && (
                        <TooltipContent>
                          <p>{feature.tooltip}</p>
                        </TooltipContent>
                      )}
                    </Tooltip>
                  </TooltipProvider>
                </div>
              ))}
            </CardContent>
            <CardFooter className="w-full mt-auto">
              <Link
                href={plan.btn.href}
                style={{ width: "100%" }}
                className={buttonVariants({
                  className:
                    plan.name === "Pro" &&
                    "bg-purple-500 hover:bg-purple-500/80 text-white",
                })}
              >
                {plan.btn.text}
              </Link>
            </CardFooter>
          </Card>
        ))}
      </TabsContent>
      <TabsContent
        value="yearly"
        className="grid grid-cols-1 lg:grid-cols-3 gap-5 w-full md:gap-8 flex-wrap max-w-5xl mx-auto pt-6"
      >
        {PLANS.map((plan) => (
          <Card
            key={plan.name}
            className={cn(
              "flex flex-col w-full border-border rounded-xl",
              plan.name === "Pro" && "border-2 border-purple-500"
            )}
          >
            <CardHeader
              className={cn(
                "border-b border-border",
                plan.name === "Pro"
                  ? "bg-purple-500/[0.07]"
                  : "bg-foreground/[0.03]"
              )}
            >
              <CardTitle
                className={cn(
                  plan.name !== "Pro" && "text-muted-foreground",
                  "text-lg font-medium"
                )}
              >
                {plan.name}
              </CardTitle>
              <CardDescription>{plan.info}</CardDescription>
              <h5 className="text-3xl font-semibold flex items-end">
                ${plan.price.yearly}
                <div className="text-base text-muted-foreground font-normal">
                  {plan.name !== "Free" ? "/year" : ""}
                </div>
                {plan.name !== "Free" && (
                  <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3, type: "spring", bounce: 0.25 }}
                    className="px-2 py-0.5 ml-2 rounded-md bg-purple-500 text-foreground text-sm font-medium"
                  >
                    -12%
                  </motion.span>
                )}
              </h5>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              {plan.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircleIcon className="text-purple-500 w-4 h-4" />
                  <TooltipProvider>
                    <Tooltip delayDuration={0}>
                      <TooltipTrigger asChild>
                        <p
                          className={cn(
                            feature.tooltip &&
                              "border-b !border-dashed border-border cursor-pointer"
                          )}
                        >
                          {feature.text}
                        </p>
                      </TooltipTrigger>
                      {feature.tooltip && (
                        <TooltipContent>
                          <p>{feature.tooltip}</p>
                        </TooltipContent>
                      )}
                    </Tooltip>
                  </TooltipProvider>
                </div>
              ))}
            </CardContent>
            <CardFooter className="w-full pt- mt-auto">
              <Link
                href={plan.btn.href}
                style={{ width: "100%" }}
                className={buttonVariants({
                  className:
                    plan.name === "Pro" &&
                    "bg-purple-500 hover:bg-purple-500/80 text-white",
                })}
              >
                {plan.btn.text}
              </Link>
            </CardFooter>
          </Card>
        ))}
      </TabsContent>
    </Tabs></section>
  );
};

export default PricingCards;
