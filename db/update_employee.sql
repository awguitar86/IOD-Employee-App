UPDATE employees
    SET
        first_name = $2,
        last_name = $3,
        email = $4,
        phone = $5,
        salary = $6
    WHERE id = $1
;