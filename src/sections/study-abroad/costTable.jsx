"use client";

import Heading from "@/components/heading";
import {
    Building2,
    MapPin,
    MoreHorizontal,
    Train,
    UtensilsCrossed,
    Wallet,
} from "lucide-react";
import { motion } from "motion/react";

const fallbackRows = [
    [
        "London",
        "£1,006 - £1,088",
        "£103",
        "£200 - £250",
        "£138 - £170",
        "£1,447 - £1,611",
    ],
    [
        "Manchester",
        "£648 - £730",
        "£70 - £100",
        "£170 - £220",
        "£80 - £120",
        "£968 - £1,170",
    ],
    [
        "Birmingham",
        "£648 - £730",
        "£70 - £100",
        "£170 - £220",
        "£80 - £120",
        "£968 - £1,170",
    ],
    [
        "Leicester",
        "£648 - £730",
        "£60 - £90",
        "£160 - £210",
        "£98 - £113",
        "£966 - £1,143",
    ],
];

const defaultHeaders = [
    "City",
    "Accommodation",
    "Transport",
    "Food",
    "Other",
    "Total / Month",
];

const headerIcons = [
    MapPin,
    Building2,
    Train,
    UtensilsCrossed,
    MoreHorizontal,
    Wallet,
];

const stripHtml = (value = "") =>
    value
        .replace(/<br\s*\/?>/gi, " ")
        .replace(/<\/(p|li|div|tr|td|th)>/gi, " ")
        .replace(/<[^>]*>/g, "")
        .replace(/&nbsp;/g, " ")
        .replace(/&amp;/g, "&")
        .replace(/\s+/g, " ")
        .trim();

const parseHtmlTable = (html = "") => {
    if (!html.includes("<table")) return null;

    const rowMatches = html.match(/<tr[^>]*>[\s\S]*?<\/tr>/gi) || [];
    const rows = rowMatches
        .map((rowHtml) => {
            const cells = rowHtml.match(/<(th|td)[^>]*>[\s\S]*?<\/\1>/gi) || [];

            return cells.map(stripHtml).filter(Boolean);
        })
        .filter((row) => row.length > 0);

    if (rows.length === 0) return null;

    const firstRowHasHeader = /<th/i.test(rowMatches[0] || "");
    const headers = firstRowHasHeader
        ? rows[0]
        : defaultHeaders.slice(0, rows[0].length);
    const bodyRows = firstRowHasHeader ? rows.slice(1) : rows;

    return bodyRows.length > 0 ? { headers, rows: bodyRows } : null;
};

const getFieldFromBody = (body = "", labels = []) => {
    const text = stripHtml(body).replace(/[–—]/g, "-").replace(/\s+/g, " ");

    for (const label of labels) {
        const regex = new RegExp(
            `${label}\\s*:?\\s*([^|,;]+?(?:\\d[^|,;]*)?)(?=\\s+(?:Accommodation|Living|Transport|Food|Meal|Other|Misc|Total|Tuition)\\s*:|$)`,
            "i",
        );
        const match = text.match(regex);
        if (match?.[1]) return match[1].trim();
    }

    return "";
};

const normalizeElementRows = (elements = []) => {
    return elements
        .filter((element) => element?.element_title || element?.element_body)
        .map((element) => {
            const body = element?.element_body || "";
            const settings = element?.settings || {};

            const accommodation =
                element?.accommodation ||
                settings?.accommodation ||
                settings?.living ||
                getFieldFromBody(body, ["Accommodation", "Living", "Rent"]);
            const transport =
                element?.transport ||
                settings?.transport ||
                getFieldFromBody(body, ["Transport", "Transportation"]);
            const food =
                element?.food ||
                settings?.food ||
                settings?.meal ||
                getFieldFromBody(body, ["Food", "Meal", "Meals"]);
            const other =
                element?.other ||
                settings?.other ||
                settings?.misc ||
                getFieldFromBody(body, ["Other", "Misc", "Miscellaneous"]);
            const total =
                element?.total ||
                settings?.total ||
                getFieldFromBody(body, [
                    "Total",
                    "Total / Month",
                    "Monthly Total",
                ]);

            const hasCostColumns =
                accommodation || transport || food || other || total;

            if (hasCostColumns) {
                return [
                    element?.element_title || "Cost",
                    accommodation || "-",
                    transport || "-",
                    food || "-",
                    other || "-",
                    total || "-",
                ];
            }

            return [element?.element_title || "Cost", stripHtml(body) || "-"];
        });
};

const buildTableData = (cost) => {
    const elements = cost?.elements || [];
    const tableSources = [
        cost?.section_description,
        ...elements.map((element) => element?.element_body),
    ];

    for (const source of tableSources) {
        const parsedTable = parseHtmlTable(source || "");
        if (parsedTable) return parsedTable;
    }

    const elementRows = normalizeElementRows(elements);
    if (elementRows.length === 0) {
        return { headers: defaultHeaders, rows: fallbackRows };
    }

    const hasFullCostRows = elementRows.some((row) => row.length > 2);

    return {
        headers: hasFullCostRows ? defaultHeaders : ["Cost Type", "Details"],
        rows: elementRows,
    };
};

const removeTables = (html = "") =>
    html.replace(/<table[\s\S]*?<\/table>/gi, "").trim();

const buildTableGroups = (tableData) => {
    const groups = [];
    let currentTable = {
        headers: tableData.headers,
        rows: [],
    };

    tableData.rows.forEach((row, index) => {
        const nextRow = tableData.rows[index + 1];
        const isNextTableHeader =
            currentTable.rows.length > 0 &&
            row.length !== currentTable.headers.length &&
            nextRow?.length === row.length;

        if (isNextTableHeader) {
            groups.push(currentTable);
            currentTable = {
                headers: row,
                rows: [],
            };
            return;
        }

        currentTable.rows.push(row);
    });

    if (currentTable.rows.length > 0) {
        groups.push(currentTable);
    }

    return groups;
};

export default function CostTable({ cost, countryName }) {
    const tableData = buildTableData(cost);
    const tableGroups = buildTableGroups(tableData);
    const headingTitle =
        cost?.section_title || `Study in the ${countryName || "UK"} costs`;
    const headingParagraph =
        removeTables(cost?.section_description || "") ||
        `Studying in the ${countryName || "ABROAD"} from Bangladesh requires careful financial planning, as monthly living costs vary by city.`;

    return (
        <section className="bg-gray-100 px-4 py-10 sm:px-6 md:py-20 lg:px-8">
            <div className="mx-auto max-w-6xl">
                <Heading
                    title={headingTitle}
                    paragraph={headingParagraph}
                    color={false}
                />

                <div className="mt-10 space-y-4 md:space-y-6">
                    {tableGroups.map((table, tableIndex) => (
                        <div
                            key={`${table.headers.join("-")}-${tableIndex}`}
                            className="overflow-x-auto rounded-2xl bg-white mb-10 shadow-sm"
                        >
                            <table
                                className={`w-full border-collapse text-left ${
                                    table.headers.length > 3
                                        ? "min-w-220"
                                        : "min-w-160"
                                }`}
                            >
                                <thead>
                                    <tr
                                        className={
                                            tableIndex % 2 === 0
                                                ? "bg-brand-accent"
                                                : "bg-brand-primary"
                                        }
                                    >
                                        {table.headers.map((header, index) => {
                                            const Icon =
                                                headerIcons[index] || Wallet;
                                            const isLastColumn =
                                                index ===
                                                table.headers.length - 1;

                                            return (
                                                <th
                                                    key={`${header}-${index}`}
                                                    className={`px-4 py-4 text-sm font-semibold text-brand-contrast md:text-base ${
                                                        isLastColumn
                                                            ? "text-right"
                                                            : ""
                                                    }`}
                                                >
                                                    <div
                                                        className={`flex items-center gap-2 ${
                                                            isLastColumn
                                                                ? ""
                                                                : ""
                                                        }`}
                                                    >
                                                        <Icon
                                                            size={25}
                                                            className="rounded-md bg-brand-contrast/10 p-1.5 text-brand-contrast"
                                                        />
                                                        {header}
                                                    </div>
                                                </th>
                                            );
                                        })}
                                    </tr>
                                </thead>
                                <tbody>
                                    {table.rows.map((row, rowIndex) => (
                                        <motion.tr
                                            key={`${row[0]}-${rowIndex}`}
                                            initial={{ opacity: 0, y: 16 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{
                                                once: true,
                                                margin: "-40px",
                                            }}
                                            transition={{
                                                duration: 0.35,
                                                delay: rowIndex * 0.05,
                                            }}
                                            className="border-b border-slate-100 even:bg-brand-primary/2 hover:bg-brand-accent/5"
                                        >
                                            {table.headers.map(
                                                (_, cellIndex) => {
                                                    const isLastColumn =
                                                        cellIndex ===
                                                        table.headers.length -
                                                            1;

                                                    return (
                                                        <td
                                                            key={`${rowIndex}-${cellIndex}`}
                                                            className={`whitespace-nowrap px-4 py-4 text-sm text-slate-700 ${
                                                                cellIndex === 0
                                                                    ? "font-semibold text-slate-700"
                                                                    : ""
                                                            } ${
                                                                isLastColumn
                                                                    ? "text-left text-brand-primary"
                                                                    : ""
                                                            }`}
                                                        >
                                                            {row[cellIndex] ||
                                                                "-"}
                                                        </td>
                                                    );
                                                },
                                            )}
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
