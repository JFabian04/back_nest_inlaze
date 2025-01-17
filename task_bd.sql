PGDMP                        }            task_bd    17.2    17.1 4    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false                        0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false                       1262    20118    task_bd    DATABASE     }   CREATE DATABASE task_bd WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Colombia.1252';
    DROP DATABASE task_bd;
                     postgres    false            ^           1247    20141    tasks_status_enum    TYPE     g   CREATE TYPE public.tasks_status_enum AS ENUM (
    'por hacer',
    'en progreso',
    'completada'
);
 $   DROP TYPE public.tasks_status_enum;
       public               postgres    false            �            1259    20160    comments    TABLE     g  CREATE TABLE public.comments (
    id integer NOT NULL,
    content character varying NOT NULL,
    read boolean DEFAULT false NOT NULL,
    deleted_at timestamp without time zone,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    task_id integer,
    user_id integer
);
    DROP TABLE public.comments;
       public         heap r       postgres    false            �            1259    20159    comments_id_seq    SEQUENCE     �   CREATE SEQUENCE public.comments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.comments_id_seq;
       public               postgres    false    224                       0    0    comments_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.comments_id_seq OWNED BY public.comments.id;
          public               postgres    false    223            �            1259    20129    projects    TABLE     |  CREATE TABLE public.projects (
    id integer NOT NULL,
    name character varying NOT NULL,
    description character varying NOT NULL,
    status boolean DEFAULT true NOT NULL,
    deleted_at timestamp without time zone,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    user_id integer
);
    DROP TABLE public.projects;
       public         heap r       postgres    false            �            1259    20128    projects_id_seq    SEQUENCE     �   CREATE SEQUENCE public.projects_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.projects_id_seq;
       public               postgres    false    220                       0    0    projects_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.projects_id_seq OWNED BY public.projects.id;
          public               postgres    false    219            �            1259    20120    roles    TABLE     \   CREATE TABLE public.roles (
    id integer NOT NULL,
    name character varying NOT NULL
);
    DROP TABLE public.roles;
       public         heap r       postgres    false            �            1259    20119    roles_id_seq    SEQUENCE     �   CREATE SEQUENCE public.roles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.roles_id_seq;
       public               postgres    false    218                       0    0    roles_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.roles_id_seq OWNED BY public.roles.id;
          public               postgres    false    217            �            1259    20182 
   task_users    TABLE     _   CREATE TABLE public.task_users (
    task_id integer NOT NULL,
    user_id integer NOT NULL
);
    DROP TABLE public.task_users;
       public         heap r       postgres    false            �            1259    20148    tasks    TABLE     �  CREATE TABLE public.tasks (
    id integer NOT NULL,
    title character varying NOT NULL,
    description character varying NOT NULL,
    status public.tasks_status_enum DEFAULT 'por hacer'::public.tasks_status_enum NOT NULL,
    date_limit date NOT NULL,
    deleted_at timestamp without time zone,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    project_id integer
);
    DROP TABLE public.tasks;
       public         heap r       postgres    false    862    862            �            1259    20147    tasks_id_seq    SEQUENCE     �   CREATE SEQUENCE public.tasks_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.tasks_id_seq;
       public               postgres    false    222                       0    0    tasks_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.tasks_id_seq OWNED BY public.tasks.id;
          public               postgres    false    221            �            1259    20172    users    TABLE     u  CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    "deletedA_at" timestamp without time zone,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    role_id integer
);
    DROP TABLE public.users;
       public         heap r       postgres    false            �            1259    20171    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public               postgres    false    226                       0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public               postgres    false    225            E           2604    20163    comments id    DEFAULT     j   ALTER TABLE ONLY public.comments ALTER COLUMN id SET DEFAULT nextval('public.comments_id_seq'::regclass);
 :   ALTER TABLE public.comments ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    224    223    224            =           2604    20132    projects id    DEFAULT     j   ALTER TABLE ONLY public.projects ALTER COLUMN id SET DEFAULT nextval('public.projects_id_seq'::regclass);
 :   ALTER TABLE public.projects ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    219    220    220            <           2604    20123    roles id    DEFAULT     d   ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('public.roles_id_seq'::regclass);
 7   ALTER TABLE public.roles ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    217    218    218            A           2604    20151    tasks id    DEFAULT     d   ALTER TABLE ONLY public.tasks ALTER COLUMN id SET DEFAULT nextval('public.tasks_id_seq'::regclass);
 7   ALTER TABLE public.tasks ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    222    221    222            I           2604    20175    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    226    225    226            �          0    20160    comments 
   TABLE DATA           k   COPY public.comments (id, content, read, deleted_at, created_at, updated_at, task_id, user_id) FROM stdin;
    public               postgres    false    224   	@       �          0    20129    projects 
   TABLE DATA           n   COPY public.projects (id, name, description, status, deleted_at, created_at, updated_at, user_id) FROM stdin;
    public               postgres    false    220   &@       �          0    20120    roles 
   TABLE DATA           )   COPY public.roles (id, name) FROM stdin;
    public               postgres    false    218   C@       �          0    20182 
   task_users 
   TABLE DATA           6   COPY public.task_users (task_id, user_id) FROM stdin;
    public               postgres    false    227   o@       �          0    20148    tasks 
   TABLE DATA           {   COPY public.tasks (id, title, description, status, date_limit, deleted_at, created_at, updated_at, project_id) FROM stdin;
    public               postgres    false    222   �@       �          0    20172    users 
   TABLE DATA           j   COPY public.users (id, name, email, password, "deletedA_at", created_at, updated_at, role_id) FROM stdin;
    public               postgres    false    226   �@                  0    0    comments_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.comments_id_seq', 1, false);
          public               postgres    false    223            	           0    0    projects_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.projects_id_seq', 1, false);
          public               postgres    false    219            
           0    0    roles_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.roles_id_seq', 2, true);
          public               postgres    false    217                       0    0    tasks_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.tasks_id_seq', 1, false);
          public               postgres    false    221                       0    0    users_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.users_id_seq', 1, true);
          public               postgres    false    225            O           2606    20139 '   projects PK_6271df0a7aed1d6c0691ce6ac50 
   CONSTRAINT     g   ALTER TABLE ONLY public.projects
    ADD CONSTRAINT "PK_6271df0a7aed1d6c0691ce6ac50" PRIMARY KEY (id);
 S   ALTER TABLE ONLY public.projects DROP CONSTRAINT "PK_6271df0a7aed1d6c0691ce6ac50";
       public                 postgres    false    220            Y           2606    20186 )   task_users PK_76dc5127b986d0b6712b811aea5 
   CONSTRAINT     w   ALTER TABLE ONLY public.task_users
    ADD CONSTRAINT "PK_76dc5127b986d0b6712b811aea5" PRIMARY KEY (task_id, user_id);
 U   ALTER TABLE ONLY public.task_users DROP CONSTRAINT "PK_76dc5127b986d0b6712b811aea5";
       public                 postgres    false    227    227            S           2606    20170 '   comments PK_8bf68bc960f2b69e818bdb90dcb 
   CONSTRAINT     g   ALTER TABLE ONLY public.comments
    ADD CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY (id);
 S   ALTER TABLE ONLY public.comments DROP CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb";
       public                 postgres    false    224            Q           2606    20158 $   tasks PK_8d12ff38fcc62aaba2cab748772 
   CONSTRAINT     d   ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT "PK_8d12ff38fcc62aaba2cab748772" PRIMARY KEY (id);
 P   ALTER TABLE ONLY public.tasks DROP CONSTRAINT "PK_8d12ff38fcc62aaba2cab748772";
       public                 postgres    false    222            U           2606    20181 $   users PK_a3ffb1c0c8416b9fc6f907b7433 
   CONSTRAINT     d   ALTER TABLE ONLY public.users
    ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY (id);
 P   ALTER TABLE ONLY public.users DROP CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433";
       public                 postgres    false    226            M           2606    20127 $   roles PK_c1433d71a4838793a49dcad46ab 
   CONSTRAINT     d   ALTER TABLE ONLY public.roles
    ADD CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY (id);
 P   ALTER TABLE ONLY public.roles DROP CONSTRAINT "PK_c1433d71a4838793a49dcad46ab";
       public                 postgres    false    218            V           1259    20188    IDX_64ad749620fd2971c294c483d7    INDEX     Z   CREATE INDEX "IDX_64ad749620fd2971c294c483d7" ON public.task_users USING btree (user_id);
 4   DROP INDEX public."IDX_64ad749620fd2971c294c483d7";
       public                 postgres    false    227            W           1259    20187    IDX_9c63da49b3431962bb3947ee09    INDEX     Z   CREATE INDEX "IDX_9c63da49b3431962bb3947ee09" ON public.task_users USING btree (task_id);
 4   DROP INDEX public."IDX_9c63da49b3431962bb3947ee09";
       public                 postgres    false    227            \           2606    20199 '   comments FK_18c2493067c11f44efb35ca0e03    FK CONSTRAINT     �   ALTER TABLE ONLY public.comments
    ADD CONSTRAINT "FK_18c2493067c11f44efb35ca0e03" FOREIGN KEY (task_id) REFERENCES public.tasks(id);
 S   ALTER TABLE ONLY public.comments DROP CONSTRAINT "FK_18c2493067c11f44efb35ca0e03";
       public               postgres    false    224    4689    222            ]           2606    20204 '   comments FK_4c675567d2a58f0b07cef09c13d    FK CONSTRAINT     �   ALTER TABLE ONLY public.comments
    ADD CONSTRAINT "FK_4c675567d2a58f0b07cef09c13d" FOREIGN KEY (user_id) REFERENCES public.users(id);
 S   ALTER TABLE ONLY public.comments DROP CONSTRAINT "FK_4c675567d2a58f0b07cef09c13d";
       public               postgres    false    224    226    4693            _           2606    20219 )   task_users FK_64ad749620fd2971c294c483d7f    FK CONSTRAINT     �   ALTER TABLE ONLY public.task_users
    ADD CONSTRAINT "FK_64ad749620fd2971c294c483d7f" FOREIGN KEY (user_id) REFERENCES public.users(id);
 U   ALTER TABLE ONLY public.task_users DROP CONSTRAINT "FK_64ad749620fd2971c294c483d7f";
       public               postgres    false    4693    226    227            `           2606    20214 )   task_users FK_9c63da49b3431962bb3947ee090    FK CONSTRAINT     �   ALTER TABLE ONLY public.task_users
    ADD CONSTRAINT "FK_9c63da49b3431962bb3947ee090" FOREIGN KEY (task_id) REFERENCES public.tasks(id) ON UPDATE CASCADE ON DELETE CASCADE;
 U   ALTER TABLE ONLY public.task_users DROP CONSTRAINT "FK_9c63da49b3431962bb3947ee090";
       public               postgres    false    4689    227    222            [           2606    20194 $   tasks FK_9eecdb5b1ed8c7c2a1b392c28d4    FK CONSTRAINT     �   ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT "FK_9eecdb5b1ed8c7c2a1b392c28d4" FOREIGN KEY (project_id) REFERENCES public.projects(id);
 P   ALTER TABLE ONLY public.tasks DROP CONSTRAINT "FK_9eecdb5b1ed8c7c2a1b392c28d4";
       public               postgres    false    220    222    4687            ^           2606    20209 $   users FK_a2cecd1a3531c0b041e29ba46e1    FK CONSTRAINT     �   ALTER TABLE ONLY public.users
    ADD CONSTRAINT "FK_a2cecd1a3531c0b041e29ba46e1" FOREIGN KEY (role_id) REFERENCES public.roles(id);
 P   ALTER TABLE ONLY public.users DROP CONSTRAINT "FK_a2cecd1a3531c0b041e29ba46e1";
       public               postgres    false    218    226    4685            Z           2606    20189 '   projects FK_bd55b203eb9f92b0c8390380010    FK CONSTRAINT     �   ALTER TABLE ONLY public.projects
    ADD CONSTRAINT "FK_bd55b203eb9f92b0c8390380010" FOREIGN KEY (user_id) REFERENCES public.users(id);
 S   ALTER TABLE ONLY public.projects DROP CONSTRAINT "FK_bd55b203eb9f92b0c8390380010";
       public               postgres    false    220    226    4693            �      x������ � �      �      x������ � �      �      x�3�LL����2�,-N-����� : �      �      x������ � �      �      x������ � �      �   �   x�3�tL����L�鹉�9z����*FI*�*%�)���~�F�^�)~�%�&aF������E�)i��ƞ��!�ޜ1~�FF������
F�VF�VFFzF������b���� ��&�     