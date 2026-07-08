-- CreateTable
CREATE TABLE "livros" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "isbn" TEXT NOT NULL,
    "preco" DECIMAL(10,2) NOT NULL,
    "quantidade" INTEGER NOT NULL DEFAULT 0,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "autorId" INTEGER NOT NULL,
    "categoriaId" INTEGER NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "livros_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "autores" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "autores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categorias" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "categorias_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "livros_isbn_key" ON "livros"("isbn");

-- AddForeignKey
ALTER TABLE "livros" ADD CONSTRAINT "livros_autorId_fkey" FOREIGN KEY ("autorId") REFERENCES "autores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "livros" ADD CONSTRAINT "livros_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "categorias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
