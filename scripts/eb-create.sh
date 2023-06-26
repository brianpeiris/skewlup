ENV_NAME=$1
eb create \
  --instance_type t3.medium \
  --database \
  --database.engine postgres \
  --database.username postgres \
  --database.version 14.7 \
  --database.instance db.t3.micro \
  "$ENV_NAME"
