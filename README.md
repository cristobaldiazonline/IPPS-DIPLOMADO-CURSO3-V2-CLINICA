# API Clínica · Evaluación Integradora Módulo 3

API REST de una clínica con Node, Express y MongoDB (Mongoose): médicos con registro y login (JWT) y pacientes protegidos por token, donde solo el médico tratante puede modificar o eliminar a su paciente.

## 🎥 Video

👉 PEGAR_AQUI_EL_ENLACE_DE_YOUTUBE

## Cómo levantarlo

1. Clonar e instalar dependencias:
   ```bash
   git clone https://github.com/cristobaldiazonline/IPPS-DIPLOMADO-CURSO3-V2-CLINICA.git
   cd IPPS-DIPLOMADO-CURSO3-V2-CLINICA
   yarn
   ```
2. Crear un archivo `.env` en la raíz copiando `.env.example` y poner la URL real de MongoDB Atlas:
   ```
   MONGODB_URI=mongodb+srv://USUARIO:CLAVE@TU-CLUSTER.mongodb.net/clinica
   ```
3. Levantar el servidor:
   ```bash
   yarn dev
   ```
4. La API queda en **http://localhost:3001**

## Rutas

| Método | Ruta | Token | Descripción |
|---|---|---|---|
| POST | `/auth/registro` | No | Registra un médico → `201 { medico, token }` |
| POST | `/auth/login` | No | Inicia sesión → `200 { medico, token }` |
| GET | `/medicos` | Sí | Lista médicos (`?especialidad=`) |
| GET | `/medicos/perfil` | Sí | Médico del token |
| GET | `/medicos/:id` | Sí | Un médico |
| GET | `/medicos/:id/pacientes` | Sí | Pacientes de un médico |
| POST | `/pacientes` | Sí | Crea paciente (médico = el del token) |
| GET | `/pacientes` | Sí | Mis pacientes (`?prevision=`) |
| GET | `/pacientes/:id` | Sí | Un paciente |
| PUT | `/pacientes/:id` | Sí | Actualiza (solo médico tratante, si no `403`) |
| DELETE | `/pacientes/:id` | Sí | Elimina → `204` (solo médico tratante) |

El token se envía en el header `Authorization: Bearer <token>`.

## Arquitectura

`routes → controllers → services → models`. Los errores se traducen a su código de estado en un solo lugar: `middlewares/errores.js` (400 validación o id inválido, 404, 403, 409 duplicado).
