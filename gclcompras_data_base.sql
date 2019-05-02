CREATE TABLE `clientes` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `apellido` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nombre` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
);

CREATE TABLE `divisas` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `venta` double NOT NULL DEFAULT '1'
);

CREATE TABLE `marcas` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL
);

CREATE TABLE `paises` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL
);

CREATE TABLE `presentaciones` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cantidad` int(10) unsigned NOT NULL DEFAULT '1'
);

CREATE TABLE `productos` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `activo` char(1) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '1',
  `nombre` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `descripcion` text COLLATE utf8mb4_unicode_ci,
  `oferta` char(1) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `precio` double(15,2) NOT NULL DEFAULT '0.00',
  `stock` int(10) unsigned NOT NULL DEFAULT '1',
  `divisa_id` int(11) NOT NULL,
  `marca_id` int(11) NOT NULL,
  `pais_id` int(11) NOT NULL,
  `presentacion_id` int(11) NOT NULL,
  `proveedor_id` int(11) DEFAULT NULL
);

CREATE TABLE `ventas` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `fecha` datetime NOT NULL,
  `cliente_id` int(11) NOT NULL,
  `canal` char(1) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '4',
  `factura` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `estado` char(1) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `fechaEnvio` datetime DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL COMMENT 'Opcional. Es para saber quien proceso la venta.'
);


CREATE TABLE `venta_detalles` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `cantidad` int(10) unsigned NOT NULL DEFAULT '1',
  `descripcion` text COLLATE utf8mb4_unicode_ci,
  `precio` double(15,2) NOT NULL DEFAULT '0.00',
  `divisa_venta` double(15,2) NOT NULL DEFAULT '1.00',
  `producto_id` int(11) NOT NULL,
  `venta_id` int(11) NOT NULL
);
