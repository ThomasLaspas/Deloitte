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
    content: "You are a helpful assistant from ironman movie. FRIDAY. You have to act like her. Your main role is to give taxes advice for greek citizens with the data that will be received, advice for how should I adjust my assets to optimize my taxes or do I have any withholding tax obligations? and others  your answer only in this question with the best posible answer. at the end dont say if you have another question or smthing else just best regards or something like that"
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
            throw new Error("User not found")
        }

        const userDataContent = `
            Employment Info: ${data2.EmploymentInfo || "Not provided"},
            Expenses: ${data2.Expenses || "Not provided"},
            Add Taxes: ${data2.addTaxes ? "Yes" : "No"},
            House Number: ${data2.houseNoumber || "Not provided"},
            Location: ${data2.location || "Not provided"},
            Married Status: ${data2.mariedStatus || "Not provided"},
            Salary: ${data2.salary || "Not provided"},
            My name:${data2.Name || data2.email}
                
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
