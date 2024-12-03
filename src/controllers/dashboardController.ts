import { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { CustomResponse } from "@/utils";

const prisma = new PrismaClient();

export const getDashboardMetrics = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const popularProducts = await prisma.products.findMany({
      take: 15,
      orderBy: {
        stockQuantity: "desc",
      },
    });
    const salesSummary = await prisma.salesSummary.findMany({
      take: 5,
      orderBy: {
        date: "desc",
      },
    });
    const puchaseSummary = await prisma.purchaseSummary.findMany({
      take: 5,
      orderBy: {
        date: "desc",
      },
    });
    const expenseSummary = await prisma.expenseSummary.findMany({
      take: 5,
      orderBy: {
        date: "desc",
      },
    });
    const expenseByCategorySummaryRaw = await prisma.expenseByCategory.findMany(
      {
        take: 5,
        orderBy: {
          date: "desc",
        },
      }
    );

    const expenseByCategory = expenseByCategorySummaryRaw.map((item) => ({
      ...item,
      amount: item.amount.toString(),
    }));

    return CustomResponse.success(res, 200, {
      popularProducts,
      salesSummary,
      puchaseSummary,
      expenseSummary,
      expenseByCategory,
    });
  } catch (error: any) {
    return next(error);
  }
};
