--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4 (Ubuntu 17.4-1.pgdg24.04+2)
-- Dumped by pg_dump version 17.4 (Ubuntu 17.4-1.pgdg24.04+2)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: transaction_details; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.transaction_details (
    transaction_id integer NOT NULL,
    transaction_hash character varying(255),
    item_name character varying(255) NOT NULL,
    item_price numeric(10,2) NOT NULL,
    escrow_title character varying(255) NOT NULL,
    initiator_role character varying(50) NOT NULL,
    currency character varying(10) NOT NULL,
    inspection_period character varying(50) NOT NULL,
    shipping_method character varying(50) NOT NULL,
    shipping_fee_paid_by character varying(50) NOT NULL,
    item_category character varying(50) NOT NULL,
    item_description text NOT NULL,
    block_explorer_url character varying(255) NOT NULL,
    chain_id character varying(50) NOT NULL,
    chain_name character varying(50) NOT NULL,
    transaction_status character varying(50) NOT NULL,
    block_number character varying(50) NOT NULL,
    "timestamp" timestamp without time zone NOT NULL,
    method character varying(50) NOT NULL,
    initiator_address character varying(255) NOT NULL,
    client_id character varying(255) NOT NULL,
    status character varying(3) DEFAULT 0,
    status_message character varying(255) DEFAULT 'Escrow Initialized'::character varying,
    initiator_email character varying(255)
);


ALTER TABLE public.transaction_details OWNER TO postgres;

--
-- Name: transaction_details_transaction_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.transaction_details_transaction_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.transaction_details_transaction_id_seq OWNER TO postgres;

--
-- Name: transaction_details_transaction_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.transaction_details_transaction_id_seq OWNED BY public.transaction_details.transaction_id;


--
-- Name: transaction_details transaction_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaction_details ALTER COLUMN transaction_id SET DEFAULT nextval('public.transaction_details_transaction_id_seq'::regclass);


--
-- Data for Name: transaction_details; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.transaction_details (transaction_id, transaction_hash, item_name, item_price, escrow_title, initiator_role, currency, inspection_period, shipping_method, shipping_fee_paid_by, item_category, item_description, block_explorer_url, chain_id, chain_name, transaction_status, block_number, "timestamp", method, initiator_address, client_id, status, status_message, initiator_email) FROM stdin;
1	0x4a2344a5b9790701a586fc6ae8b8e76193b1aba013790f9c85f48d087b40e19a	MacBook Pro 16" M2	1999.99	High-value electronics escrow'	Buyer	STNGN	2	Cargo Shipping	Buyer	Computer Hardware & Software	rand new MacBook Pro 16" with M2 chip, 32GB RAM, 1TB SSD	https://base-sepolia.blockscout.com/tx/0x4a2344a5b9790701a586fc6ae8b8e76193b1aba013790f9c85f48d087b40e19a	84532	Base Sepolia	Success	23417765	2025-03-28 23:07:15.025	createEscrow	0xBdfe2c7f744a44d557eD120e146aC19A9D98d59E	184b4b84b53c73f73c3abb20320f9a28	2	Transaction approved by seller	sealedtrustcss@gmail.com
6	0x29e76ca06280f2df60bcc83bf0cd2fb669b4c9805c6d8a039b0db442442ee1fd	Rare NFT Artwork	250.00	NFT sale escrow	Buyer	STNGN	01	Cargo Shipping	Buyer	NFT	rand new MacBook Pro 16" with M2 chip, 32GB RAM, 1TB SSD	https://base-sepolia.blockscout.com/tx/0x29e76ca06280f2df60bcc83bf0cd2fb669b4c9805c6d8a039b0db442442ee1fd	84532	Base Sepolia	Success	23417765	2025-04-13 17:31:55.887	createEscrow	0xBdfe2c7f744a44d557eD120e146aC19A9D98d59E	184b4b84b53c73f73c3abb20320f9a28	0	Escrow Initialized	\N
2	0xc863ebb9dc987823a3db14db5dd62ef19100ae98fb8f2de0c7ce94bc36452513	Rare NFT Artwork	10.93	NFT sale escrow	Buyer	USDT	1	No Shipping	Buyer	NFT	xclusive 1/1 digital artwork by a famous crypto artist	https://base-sepolia.blockscout.com/tx/0xc863ebb9dc987823a3db14db5dd62ef19100ae98fb8f2de0c7ce94bc36452513	84532	Base Sepolia	Success	23417765	2025-03-28 23:41:32.56	createEscrow	0xBdfe2c7f744a44d557eD120e146aC19A9D98d59E	184b4b84b53c73f73c3abb20320f9a28	0	Escrow Initialized	sealedtrustcss@gmail.com
3	0x393b4f1098d4093963af208ed51f9832c8579d28669e26fd10cba3b392ab8d82	Rare NFT Artwork	202.98	NFT sale escrow	Seller	STNGN	1	No Shipping	Seller	NFT	Digital artwork by a crypto artist	https://base-sepolia.blockscout.com/tx/0x393b4f1098d4093963af208ed51f9832c8579d28669e26fd10cba3b392ab8d82	84532	Base Sepolia	Success	23417765	2025-04-12 03:39:17.312	createEscrow	0xBdfe2c7f744a44d557eD120e146aC19A9D98d59E	184b4b84b53c73f73c3abb20320f9a28	0	Escrow Initialized	sealedtrustcss@gmail.com
4	0xbf9cc3502b817afa4ace13441265c394418907dcc8ac85e7f7bc522baeabe619	MacBook Pro 16" M2	25000.65	High-value electronics escrow'	Buyer	USDC	1	Air Shipping	Buyer	Electronics	rand new MacBook Pro 16" with M2 chip, 32GB RAM, 1TB SSD	https://base-sepolia.blockscout.com/tx/0xbf9cc3502b817afa4ace13441265c394418907dcc8ac85e7f7bc522baeabe619	84532	Base Sepolia	Success	23417765	2025-04-12 05:39:05.948	createEscrow	0xBdfe2c7f744a44d557eD120e146aC19A9D98d59E	184b4b84b53c73f73c3abb20320f9a28	0	Escrow Initialized	sealedtrustcss@gmail.com
7	0x2e1fc348fcebbedfc3e0d4e9691ea8a0632b1a2583ac49082f11a57f6fed699a	Rare NFT Artwork	44.00	NFT sale escrow	Seller	USDT	2	Cargo Shipping	Buyer	NFT	rand new MacBook Pro 16" with M2 chip, 32GB RAM, 1TB SSD	https://base-sepolia.blockscout.com/tx/0x2e1fc348fcebbedfc3e0d4e9691ea8a0632b1a2583ac49082f11a57f6fed699a	84532	Base Sepolia	Success	23417765	2025-04-15 12:22:15.854	createEscrow	0xBdfe2c7f744a44d557eD120e146aC19A9D98d59E	184b4b84b53c73f73c3abb20320f9a28	1	Escrow Initialized	jvc8463@gmail.com
\.


--
-- Name: transaction_details_transaction_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.transaction_details_transaction_id_seq', 7, true);


--
-- Name: transaction_details transaction_details_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transaction_details
    ADD CONSTRAINT transaction_details_pkey PRIMARY KEY (transaction_id);


--
-- PostgreSQL database dump complete
--

