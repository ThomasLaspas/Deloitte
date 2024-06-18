"use server"
import { NextResponse } from "next/server";
import { ChatCompletionMessageParam } from 'openai/resources/index.mjs';
import { OpenAI } from "openai";
import { auth } from '@clerk/nextjs/server';
import prisma from '@/utils/db';

const configuration = new OpenAI({
    apiKey: process.env.NEXTJS_AI_API_KEY!
});

const instructionMessage: ChatCompletionMessageParam = {
    role: 'system',
    content: "You are a helpful assistant from ironman movie. FRIDAY. You have to act like her. Your main role is to give taxes advice with the data that will be received, your answer is better to be in one pargraph"
};

export const Aigenerator = async () => {
    try {
        const { userId } = auth();
        if (!userId) {
            throw new Error("unauthorized")
        }
        if (!configuration.apiKey) {
            throw new Error("Open api kaey is not valid")
        }

        const data2 = await prisma.users.findFirst({
            where: { id: userId }
        });

        if (!data2) {
            throw new Error("User naot found")
        }

        const userDataContent = `
            Employment Info: ${data2.EmploymentInfo || "Not provided"},
            Expenses: ${data2.Expenses || "Not provided"},
            Add Taxes: ${data2.addTaxes ? "Yes" : "No"},
            House Number: ${data2.houseNoumber || "Not provided"},
            Location: ${data2.location || "Not provided"},
            Married Status: ${data2.mariedStatus || "Not provided"},
            Salary: ${data2.salary || "Not provided"}
        `;

        const userMessage: ChatCompletionMessageParam = {
            role: 'user',
            content: userDataContent
        };

        const response = await configuration.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [instructionMessage, userMessage]
        });

        const advice = response.choices[0].message;
        return advice;

    } catch (err) {
        console.log(err);
        throw new Error("Interanl server error");
    }
};
