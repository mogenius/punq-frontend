#!/bin/bash


terms=(
  "namespace"

)


for i in "${terms[@]}"
do

dstName=$i
pascal_case=$(echo "$dstName" | awk -F- '{
    for (i=1; i<=NF; i++) {
        $i = toupper(substr($i,1,1)) tolower(substr($i,2));
    }
    print $0;
}' OFS="")

cp -r "workload-pod-table" "workload-${dstName}-table"

cd "workload-${dstName}-table"

find . -depth -name '*pod*' -execdir bash -c 'mv "$1" "$(echo $1 | sed s/pod/'$dstName'/g)"' _ {} \;


find . -depth -type f -exec sed -i '' 's/pod/'$dstName'/g' {} +
find . -depth -type f -exec sed -i '' 's/Pod/'$pascal_case'/g' {} +

cd ..
done
