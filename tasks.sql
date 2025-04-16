create table tasks
(
    id            bigint default nextval('tasks_id_seq'::regclass) not null
        primary key,
    case_number   varchar(255)
        unique,
    title         varchar(255)                                     not null,
    description   text,
    status        varchar(255)                                     not null,
    due_date_time timestamp
);

alter table tasks
    owner to postgres;

INSERT INTO public.tasks (id, case_number, title, description, status, due_date_time) VALUES (1, 'CASE-001', 'Review Case Documents', 'Go through the evidence submitted for case #ABC123.', 'Pending', '2025-04-12 10:30:00.000000');
INSERT INTO public.tasks (id, case_number, title, description, status, due_date_time) VALUES (2, 'CASE-002', 'Prepare Witness List', 'Draft a preliminary list of witnesses for the upcoming hearing.', 'In Progress', '2025-04-14 16:00:00.000000');
INSERT INTO public.tasks (id, case_number, title, description, status, due_date_time) VALUES (3, 'CASE-003', 'Submit Case Notes', null, 'Completed', '2025-04-10 14:00:00.000000');
INSERT INTO public.tasks (id, case_number, title, description, status, due_date_time) VALUES (4, 'CASE-004', 'Follow Up with Defendant', 'Send a letter requesting a statement from the defendant.', 'Pending', '2025-04-15 09:00:00.000000');
INSERT INTO public.tasks (id, case_number, title, description, status, due_date_time) VALUES (7, 'CASE-006', 'Prepare hearing notes', 'Summarise key case details for the judge.', 'In Progress', '2025-04-20 00:00:00.000000');
INSERT INTO public.tasks (id, case_number, title, description, status, due_date_time) VALUES (8, 'CASE-008', 'Scheduling Meeting', 'Book a 30-min case status review with legal team', 'Pending', '2025-04-04 00:00:00.000000');
INSERT INTO public.tasks (id, case_number, title, description, status, due_date_time) VALUES (9, 'CASE-007', 'Respond To Inquiry', 'Respond to external stakeholder request about case status', 'On-Hold', '2025-05-02 00:00:00.000000');
