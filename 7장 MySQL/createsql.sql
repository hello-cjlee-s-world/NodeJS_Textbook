CREATE SCHEME 'nodejs' DEFAULT CHARACTER SET utf8;

CREATE TABLE nodejs.users(
	id INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(20) NOT NULL,
	age INT UNSIGNED NOT NULL,
	married TINYINT NOT NULL,
	comment TEXT NULL,
	created_ad DATETIME NOT NULL DEFAULT now(),
	PRIMARY KEY(id),
	UNIQUE INDEX name_UNIQUE (name ASC))
	COMMENT = '사용자 정보',
	DEFAULT CHARACTER SET = utf8
	ENGINE = InnoDB;

CREATE TABLE nodejs.comments(
	id INT NOT NULL AUTO_INCREMENT,
	commenter INT NOT NULL,
	comment VARCHAR(100) NOT NULL,
	create_at DATETIME NOT NULL DEFAULT now(),
	PRIMARY KEY (id),
	INDEX commenter_idx (commenter ASC),
	CONSTRAINT commenter
	FOREIGN KEY (commenter)
	REFERENCES nodejs.users (id)
	ON DELETE CASCADE
	ON UPDATE CASCADE)
	COMMENT = '댓글'
	DEFAULT CHARSET=utf8mb4
	ENGINE=InnoDB;


INSERT INTO nodejs.users
            (name,
             age,
             married,
             comment)
VALUES     ( 'nero',
             32,
             1,
             '자기소개2' ); 
			 
INSERT INTO nodejs.comments (commenter, comment) VALUES (1, '안녕하세요. zero의 댓글입니다.');
