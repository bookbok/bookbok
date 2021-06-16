<?php
namespace App\Services;

class Webpack
{
    /**
     * @var string
     */
    private $manifest_path;

    /**
     * manifest.jsonから取得したエントリーポイント名と実ファイル名のマップ
     * @var array<string,string>|null
     */
    private $manifest;

    /**
     * @param string $public_path
     * @param string $build_file_dir_name
     * @param string $manifest_filename
     * @return void
     */
    public function __construct(
        string $public_path,
        string $build_file_dir_name,
        string $manifest_filename
    ) {
        $this->manifest_path = implode(DIRECTORY_SEPARATOR, [$public_path, $build_file_dir_name, $manifest_filename]);
    }

    /**
     * manifest.jsonからファイル名のマップを読み込む。
     */
    private function load(): void {
        if ($this->manifest !== null) {
            return;
        }

        $manifest = file_get_contents($this->manifest_path);
        if ($manifest === false) {
            throw new \Exception('ビルドしていない');
        }

        try {
            $this->manifest = json_decode($manifest, true);
        } catch (\Throwable $e) {
            $this->manifest = null;
            throw new \Exception('マニフェストをjsonパースできなかった', 0, $e);
        }
    }

    /**
     * 指定したエントリーポイント名に紐づく実ファイル名を返す。
     *
     * @param string $name
     * @return string
     */
    public function get(string $name): string {
        $this->load();

        if (!isset($this->manifest[$name])) {
            throw new \Exception("マニフェスト存在しないエントリーポイント名が指定された（{$name}）");
        }

        return $this->manifest[$name];
    }
}
