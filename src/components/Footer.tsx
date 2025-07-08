import packageJson from '../../package.json';

export function Footer() {
  return (
    <div className='mt-2 flex flex-col items-center'>
      <a
        href={packageJson.repository.url}
        target='_blank'
        rel='noopener noreferrer'>
        v{packageJson.version}
      </a>
    </div>
  );
}
