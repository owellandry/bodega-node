
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


DROP DATABASE IF EXISTS `prueba`;

CREATE DATABASE prueba;


USE prueba;


CREATE TABLE `bodegas` (
  `id` BIGINT(20) PRIMARY KEY AUTO_INCREMENT,
  `nombre` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `id_responsable` BIGINT(20) NOT NULL,
  `estado` tinyint(4) NOT NULL DEFAULT '1',
  `created_by` BIGINT(20) NULL DEFAULT NULL,
  `updated_by` BIGINT(20) NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;


--
-- Table structure for table `historiales`
--


CREATE TABLE `historiales` (
  `id` BIGINT(20) PRIMARY KEY AUTO_INCREMENT,
  `cantidad` int(11) NOT NULL,
  `id_bodega_origen` BIGINT(20) NOT NULL,
  `id_bodega_destino` BIGINT(20) NOT NULL,
  `id_inventario` BIGINT(20) NOT NULL,
  `created_by` BIGINT(20) NULL DEFAULT NULL,
  `updated_by` BIGINT(20) NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Table structure for table `inventarios`
--

CREATE TABLE `inventarios` (
  `id` BIGINT(20) PRIMARY KEY AUTO_INCREMENT,
  `id_bodega` BIGINT(20) NOT NULL,
  `id_producto` BIGINT(20) NOT NULL,
  `cantidad` INT(11) NOT NULL,
  `created_by` BIGINT(20) NULL DEFAULT NULL,
  `updated_by` BIGINT(20) NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;


--
-- Table structure for table `productos`
--

CREATE TABLE `productos` (
  `id` BIGINT(20) PRIMARY KEY AUTO_INCREMENT,
  `nombre` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `descripcion` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `estado` tinyint(4) NOT NULL DEFAULT '1',
  `created_by` BIGINT(20) NULL DEFAULT NULL,
  `updated_by` BIGINT(20) NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;


--
-- Table structure for table `usuarios`
--

CREATE TABLE `usuarios` (
  `id` BIGINT(20) PRIMARY KEY AUTO_INCREMENT,
  `nombre` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `email_verifed_at` timestamp NULL DEFAULT NULL,
  `foto` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `estado` tinyint(4) NOT NULL DEFAULT '1',
  `created_by` BIGINT(20) NULL DEFAULT NULL,
  `updated_by` BIGINT(20) NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;



--
-- Indexes for dumped tables
--

--
-- Indexes for table `bodegas`
--
ALTER TABLE `bodegas`
  ADD KEY `bodegas_created_by_foreign` (`created_by`),
  ADD KEY `bodegas_id_responsable_foreign` (`id_responsable`),
  ADD KEY `bodegas_update_by_foreign` (`updated_by`);

--
-- Indexes for table `historiales`
--
ALTER TABLE `historiales`
  ADD KEY `id_bodega` (`id_bodega_origen`,`id_bodega_destino`),
  ADD KEY `historiales_Created_by_foreign` (`created_by`),
  ADD KEY `historiales_id_inventario_foreign` (`id_inventario`),
  ADD KEY `historiales_update_by_foreign` (`updated_by`);



--
-- Indexes for table `inventarios`
--
ALTER TABLE `inventarios`
  ADD UNIQUE KEY `id_bodega` (`id_bodega`,`id_producto`),
  ADD KEY `inventarios_created_by_foreign` (`created_by`),
  ADD KEY `inventarios_id_producto_foreign` (`id_producto`),
  ADD KEY `inventarios_update_by_foreign` (`updated_by`);

--
-- Indexes for table `productos`
--
ALTER TABLE `productos`
  ADD KEY `productos_created_by_foreign` (`created_by`),
  ADD KEY `productos_update_by_foreign` (`updated_by`);


--
-- Constraints for dumped tables
--

--
-- Constraints for table `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `productos_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `productos_update_by_foreign` FOREIGN KEY (`updated_by`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE;



--
-- Constraints for table `bodegas`
--
ALTER TABLE `bodegas`
  ADD CONSTRAINT `bodegas_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `bodegas_id_responsable_foreign` FOREIGN KEY (`id_responsable`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `bodegas_update_by_foreign` FOREIGN KEY (`updated_by`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `inventarios`
--
ALTER TABLE `inventarios`
  ADD CONSTRAINT `inventarios_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `inventarios_id_bodega_foreign` FOREIGN KEY (`id_bodega`) REFERENCES `bodegas` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `inventarios_id_producto_foreign` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `inventarios_update_by_foreign` FOREIGN KEY (`updated_by`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `historiales`
--

ALTER TABLE `historiales`
  ADD CONSTRAINT `inventarios_id_inventario_foreign` FOREIGN KEY (`id_inventario`) REFERENCES `inventarios` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `historiales_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `historiales_id_bodega_origen_foreign` FOREIGN KEY (`id_bodega_origen`) REFERENCES `bodegas` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `historiales_id_bodega_destino_foreign` FOREIGN KEY (`id_bodega_destino`) REFERENCES `bodegas` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `historiales_update_by_foreign` FOREIGN KEY (`updated_by`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE;


COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
