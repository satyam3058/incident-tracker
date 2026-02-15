# Incident Tracker

Simple incident tracking app with a Spring Boot backend and React frontend.

## Running the app

**Backend**
```bash
cd backend
./mvnw spring-boot:run
```
Runs on http://localhost:8080. Uses H2 in-memory DB.

**Frontend**
```bash
cd frontend
npm install
npm run dev
```
Runs on http://localhost:5173.

## Design Decisions

- Used **H2 in-memory database**
- **Pagination and filtering happen on the DB side** — frontend sends ?page=0&size=10
- Backend can handle multiple concurrent requests using @Transactional(isolation = READ_COMMITTED)
- Standard **Controller → Service → Repository** structure with DTOs
- Input validation via Jakarta annotations (`@NotBlank`, `@NotNull`)

## Tech

Java 17, Spring Boot 3.2, Spring Data JPA, H2, React 18, Vite, Axios
