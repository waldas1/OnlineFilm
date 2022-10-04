INSERT INTO USERS(id, name, surname, username, password)
VALUES ('97591abe-5108-4bc2-afaa-6bc6a339619c', 'test_user', 'test_user', 'user',
        '{bcrypt}$2a$10$AsRCsrfh4423vjPr0xKpZeNpYixVcNtDpiGdM5xcIejUXOttH2jcu'), /*USER*/
       ('1c6eb4cd-b644-4932-8d88-ec97b3ba0b7b', 'test_admin', 'test_admin', 'admin',
        '{bcrypt}$2a$10$9Ox9WgR8X5SD04lLSdCwJ.AITH/cAZmcZ9tMkqJUFYSc0krItXT9W'); /*admin*/

INSERT INTO ROLES(id, name)
VALUES ('7f74bb02-9f14-43ce-8b28-8c0c889d1558', 'USER'),
       ('25dde1c9-f740-46a7-a598-d62f37126950', 'ADMIN');

INSERT INTO USERS_ROLES(user_id, role_id)
VALUES ('97591abe-5108-4bc2-afaa-6bc6a339619c', '7f74bb02-9f14-43ce-8b28-8c0c889d1558'),
       ('1c6eb4cd-b644-4932-8d88-ec97b3ba0b7b', '7f74bb02-9f14-43ce-8b28-8c0c889d1558'),
       ('1c6eb4cd-b644-4932-8d88-ec97b3ba0b7b', '25dde1c9-f740-46a7-a598-d62f37126950');

INSERT INTO FILMS(id, category, country, description, film_pic, film_video, release_date, title)
VALUES ('d2b1e2c7-2d0c-4682-ae76-50c750816271', 'Action', 'USA',
        'Sam Witwicky takes his first tenuous steps into adulthood while remaining a reluctant human ally of Autobot-leader Optimus Prime. The film centers around the space race between the USSR and the USA, suggesting there was a hidden Transformers role in it all that remains one of the planet''s most dangerous secrets.',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_BtuxZinHfFZXIIW1ADk_pC5vn5i8Yx5iag&usqp=CAU',
        'https://www.youtube.com/embed/wR-CovQuK0c?autoplay=1&muted=1', '28.06.2011', 'Transformers 3'),
       ('8e3e006a-4283-11ed-b878-0242ac120002', 'Drama', 'USA',
        'The story of ex-cop Billy Taggart. 7 years ago, he shot a 16-year-old teenager, for which he was fired from the police. Taggart now works as a private detective who is hired by the mayor to find out if his wife is cheating on him. However, the investigation of the mayor''s wife''s adultery turns into a real scandal. The man with whom the mayor''s wife cheated on her husband is killed, and a bad real estate story comes to the surface.',
        'https://kinogo.biz/uploads/posts/2020-03/1585402443-942128646.jpg',
        'video', '15.08.2012', 'Sin City'),
       ('9974ac54-4283-11ed-b878-0242ac120002', 'Comedy', 'Canada',
        'The powerful forces of evil have captured the beautiful planet and enslaved the entire universe. But nothing will make Spark and his faithful friends give up. If you have a brave and kind heart, an unbending will to win and a dedicated team, any task is up to you! The stellar mission to save the universe begins.',
        'https://kinogo.biz/uploads/posts/2020-03/1585360608-1547399627.jpg',
        'https://www.youtube.com/embed/YHsAfRTlCOg?autplay=1&muted=1', '01.26.2016',
        'SPARK. Hero of the universe'),
       ('181209c2-435f-11ed-b878-0242ac120002', 'Action', 'USA',
        'After the tragic events, Thor lost not only the throne, position and relatives, he lost the most important thing - himself. Until some time, he lived a fallen life, was heavily addicted to alcohol and led an unhealthy existence. But I decided to fix the situation. He traveled with the guardians of the galaxy, they made good company for adventures. During the trips, he searched for himself, tried to find a new place in the world.',
        'https://kinogo.biz/uploads/posts/2022-04/1650652033-1068812062.webp',
        'https://www.youtube.com/embed/Go8nTmfrQd8?autoplay=1&muted=1', '26.04.2022', 'Thor: Love and Thunder'),
       ('25fa9338-435f-11ed-b878-0242ac120002', 'Thriller', 'USA',
        'New Mexico, 1897. Max Borlund, an experienced bounty hunter, receives the order. His task is to find Rachel, the wife of Nathan Price. Nathan is a big businessman, and is ready to pay a large sum to get his wife back home. The customer is sure she was kidnapped and taken to Mexico. The suspect''s name is Elijah Jones. After receiving the bail, max leaves. Through grueling trips, Borlund gets a..',
        'https://kinogo.biz/uploads/posts/2022-09/1664557764-2015702519.webp',
        'https://www.youtube.com/embed/Nx8Gl4Yh8-g?autoplay=1%muted=1', '01.01.2022', 'Dead for a dollar'),
       ('f644b168-435f-11ed-b878-0242ac120002', 'Fantasy', 'USA',
        'The continuing quest of Frodo and the Fellowship to destroy the One Ring. Frodo and Sam discover they are being followed by the mysterious Gollum. Aragorn, the Elf archer Legolas, and Gimli the Dwarf encounter the besieged Rohan kingdom, whose once great King Theoden has fallen under Saruman''s deadly spell.',
        'https://m.media-amazon.com/images/M/MV5BZGMxZTdjZmYtMmE2Ni00ZTdkLWI5NTgtNjlmMjBiNzU2MmI5XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_FMjpg_UX1000_.jpg',
        'https://www.youtube.com/embed/hYcw5ksV8YQ?autplay=1&muted=1', '09.15.2002',
        'The Lord of the Rings: The Two Towers');

INSERT INTO COMMENTS(id, comment, date, films_id, username)
VALUES ('c170e70c-400a-11ed-b878-0242ac120002', 'nice film', '2022-09-29',
        'd2b1e2c7-2d0c-4682-ae76-50c750816271', 'admin'),
       ('2f6f1962-400c-11ed-b878-0242ac120002', '(smile)', '2022-09-29',
        'd2b1e2c7-2d0c-4682-ae76-50c750816271', 'admin'),
       ('9a45039e-4013-11ed-b878-0242ac120002', '(hi)', '2022-09-29',
        'd2b1e2c7-2d0c-4682-ae76-50c750816271', 'user');