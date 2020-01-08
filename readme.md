<div style="page-break-after: always;"></div>

# Mis pedidos

    mis_compras: [
        0: {
            id: number,
            fecha: datetime: 'yyyy-mm-dd h:m:s',
            factura: string,
            iva: number,
            estado_id: number,
            estado: string,
            fechaEnvio: datetime: 'yyyy-mm-dd h:m:s',
            detalle_compra: [
                0: {,
                id: number,
                cantidad: number,
                descripcion: string,
                precio: double/currency,
                producto_id: int,
                venta_id: int
                },
                ...
            ],
            vendedor: [
                id: number,
                fullname: string,
                email: string
            ]
        },
        ...
    ]

# Productos

    productos: [
        0: {
            id: int,
            nombre: string,
            precio: double,
            presentacion: string,
            procedencia: string,
            divisa_venta: double,
            descripcion: string/null
        }
        ...
    ]

# Cliente

    user: {
        apellido: string,
        email: string,
        empresa_id: number,
        fullname: string,
        id: number,
        nombre: string,
        password: string
    }
