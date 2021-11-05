INSERT INTO department
  (name)
VALUES
('Production'),
('Research and Development'),
('Sales'),  
('Marketing');

INSERT INTO role
  (title, salary, department_id)
VALUES
  ('Department Manager', "145000", 1),
  ('Department Manager', "165000", 2),
  ('Department Manager', "115000", 3),
  ('Department Manager', "145000", 4),
  ('Developer',"90000", 1),
  ('Researcher',"105000", 2),
  ('Salesperson', "75000", 3),
  ('MarketMan', "85000", 4);

INSERT INTO employee
  (first_name, last_name, role_id, manager_id)
VALUES
  ('James', 'Fraser', 1, NULL),
  ('Jack', 'London', 2, NULL),
  ('Robert', 'Bruce', 3, NULL),
  ('Peter', 'Greenaway', 4, NULL),
  ('Derek', 'Jarman', 5, 1),
  ('Paolo', 'Pasolini', 6, 2),
  ('Chester', 'Kington', 7, 3),
  ('Heathcote', 'Williams', 8, 4);
  



  
  