export default function dateFormatter(createAt?: number[]) {
  return createAt && `${createAt[0]}. ${createAt[1]}. ${createAt[2]}`;
}
