echo "请输入初始化的表名:"

read name

npx sequelize migration:generate --name=init-$name
