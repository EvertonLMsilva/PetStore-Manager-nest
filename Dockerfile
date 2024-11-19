FROM golang:1.23.2-alpine AS builder
RUN apk update 
WORKDIR /app
COPY go.mod go.sum ../.env ./
COPY . .
RUN go build -o petstore_manager .

FROM alpine:latest
COPY --from=builder /app/petstore_manager .
COPY .env ./

CMD [ "./petstore_manager"]