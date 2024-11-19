CREATE TABLE IF NOT EXISTS pet_shop_manager.profile_pets
(
    id character varying COLLATE pg_catalog."default" NOT NULL,
    name character varying COLLATE pg_catalog."default" NOT NULL,
    birthday character varying COLLATE pg_catalog."default" NOT NULL,
    race character varying COLLATE pg_catalog."default" NOT NULL,
    sexo character varying COLLATE pg_catalog."default" NOT NULL,
    species character varying COLLATE pg_catalog."default" NOT NULL,
    coat character varying COLLATE pg_catalog."default" NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT pets_pk PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS pet_shop_manager.profile_address
(
    id character varying COLLATE pg_catalog."default" NOT NULL,
    street character varying COLLATE pg_catalog."default" NOT NULL,
    "number" character varying COLLATE pg_catalog."default" NOT NULL,
    city character varying COLLATE pg_catalog."default" NOT NULL,
    neighbornhood character varying COLLATE pg_catalog."default" NOT NULL,
    state character varying COLLATE pg_catalog."default" NOT NULL,
    zip_code character varying COLLATE pg_catalog."default" NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT address_pk PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS pet_shop_manager.profile_user_address
(
    id character varying COLLATE pg_catalog."default" NOT NULL,
    id_user text COLLATE pg_catalog."default",
    id_address text COLLATE pg_catalog."default",
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT user_address_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS pet_shop_manager.profile_users
(
    id character varying COLLATE pg_catalog."default" NOT NULL,
    name character varying COLLATE pg_catalog."default" NOT NULL,
    birthday character varying COLLATE pg_catalog."default" NOT NULL,
    phone character varying COLLATE pg_catalog."default" NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now(),
    CONSTRAINT users_pkey PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS pet_shop_manager.profile_user_address
    ADD CONSTRAINT user_address_id_address_fkey FOREIGN KEY (id_address)
    REFERENCES pet_shop_manager.profile_user_address (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS pet_shop_manager.profile_user_address
    ADD CONSTRAINT user_address_id_user_fkey FOREIGN KEY (id_user)
    REFERENCES pet_shop_manager.profile_users (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


CREATE TABLE IF NOT EXISTS veterinarians_manager.vaccines
(
    id character varying COLLATE pg_catalog."default" NOT NULL,
    name character varying COLLATE pg_catalog."default" NOT NULL,
    description character varying COLLATE pg_catalog."default" NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT vaccines_pk PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS auth_manager.auth_user (
    id character varying COLLATE pg_catalog."default" NOT NULL,
    email character varying COLLATE pg_catalog."default" NOT NULL,
    password character varying COLLATE pg_catalog."default" NOT NULL,
    active boolean,
    id_user character varying COLLATE pg_catalog."default",
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now(),
    CONSTRAINT users_pkey PRIMARY KEY (id)
);

END;