"use client";

import type { Icon } from "@tabler/icons-react";
import type { FieldValues, Path, UseFormReturn } from "react-hook-form";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export type FieldType = "input" | "select" | "textarea" | "switch";
export interface FormFieldConfig<T extends FieldValues> {
	name: Path<T>;
	label: string;
	placeholder?: string;
	icon: Icon;
	type: FieldType;
	options?: { label: string; value: string }[];
	className?: string;
}

interface SchemaFormFieldsProps<T extends FieldValues> {
	fields: FormFieldConfig<T>[];
	form: UseFormReturn<T>;
}

export function SchemaFormFields<T extends FieldValues>({
	fields,
	form,
}: SchemaFormFieldsProps<T>) {
	return (
		<div className="grid grid-cols-2 gap-4">
			{fields.map((field) => (
				<FormField
					control={form.control}
					key={field.name}
					name={field.name}
					render={({ field: fieldProps }) => (
						<FormItem className={field.className || "col-span-2"}>
							<FormLabel className="flex items-center gap-2 font-semibold text-slate-700">
								<field.icon className="text-slate-400" size={18} />{" "}
								{field.label}
							</FormLabel>
							<SchemaFormControl field={field} fieldProps={fieldProps} />
							<FormMessage />
						</FormItem>
					)}
				/>
			))}
		</div>
	);
}

function SchemaFormControl({
	field,
	fieldProps,
}: {
	field: FormFieldConfig<any>;
	fieldProps: any;
}) {
	return (
		<FormControl>
			<>
				{field.type === "input" && (
					<Input
						className="h-10 border-slate-200 focus-visible:ring-slate-400"
						placeholder={field.placeholder}
						{...fieldProps}
						value={fieldProps.value ?? ""}
					/>
				)}

				{field.type === "textarea" && (
					<Textarea
						className="min-h-[100px] resize-none border-slate-200 focus-visible:ring-slate-400"
						placeholder={field.placeholder}
						{...fieldProps}
						value={fieldProps.value ?? ""}
					/>
				)}

				{field.type === "select" && (
					<Select
						defaultValue={fieldProps.value ?? undefined}
						onValueChange={fieldProps.onChange}
					>
						<SelectTrigger className="h-10 border-slate-200 bg-slate-50/50">
							<SelectValue placeholder={`Select ${field.label}`} />
						</SelectTrigger>
						<SelectContent>
							{field.options?.map((opt) => (
								<SelectItem key={opt.value} value={opt.value}>
									{opt.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				)}
			</>
		</FormControl>
	);
}
