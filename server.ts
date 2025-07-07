import app from "./src/app.js";

const PORTA = process.env.PORT || 3001;

app
  .listen(PORTA, () => {
    console.log(`Servidor executando em http://localhost:${PORTA}`);
  })
  .on("error", (err: any) => {
    if (err.code === "EADDRINUSE") {
      console.log(
        `Porta ${PORTA} já está em uso. Tentando porta ${Number(PORTA) + 1}...`
      );
      app.listen(Number(PORTA) + 1, () => {
        console.log(
          `Servidor executando em http://localhost:${Number(PORTA) + 1}`
        );
      });
    } else {
      console.error("Erro ao iniciar servidor:", err);
    }
  });
