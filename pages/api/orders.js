import { PrismaClient } from "@prisma/client";

export default async function handle(req, res) {
  const prisma = new PrismaClient();
  if (req.method === "POST") {
    const { name, total, order, date } = req.body;
    const result = await prisma.order.create({
      data: {
        name,
        total,
        requisition: order,
        date,
      },
    });
    res.json(result);
  }
}
