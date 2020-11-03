FROM golang:1.15-alpine3.12

ADD src /app

WORKDIR /app

# Download all the dependencies
RUN go mod download

# Install the package
RUN go build -o main .

CMD ["/app/main"]