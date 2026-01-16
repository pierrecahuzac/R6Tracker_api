import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const OperatorService = {
  getAll: async () => {
    const operators = await prisma.operator.findMany();
    return operators;
  },

  getAllOperatorsBySide: async (sideName) => {
    const side = await prisma.side.findUnique({
      where: { name: sideName },
    });

    if (!side) {
      throw new Error("Side non trouvée");
    }

    const operators = await prisma.operator.findMany({
      where: { sideId: side.id },
    });

    return operators;
  },
};

export default OperatorService;

