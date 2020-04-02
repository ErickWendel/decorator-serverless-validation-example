curl -X POST \
    -H "Content-Type: application/json" \
    -H "authorization: Bearer 123" \
    --data '{"name": "Erick", "email": "erick@e.com", "age": 24}' \
    localhost:3000/dev/users
