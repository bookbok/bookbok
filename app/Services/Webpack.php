<?php

namespace App\Services;

class Webpack
{
    private string $manifestPath;

    /**
     * manifest.jsonから取得したエントリーポイント名と実ファイル名のマップ
     * @phpstan-var array<string,string>|null
     */
    private ?array $manifest;

    public function __construct(string $publicPath, string $buildFileDirName, string $manifestFilename)
    {
        $this->manifestPath = implode(DIRECTORY_SEPARATOR, [$publicPath, $buildFileDirName, $manifestFilename]);
    }

    /**
     * manifest.jsonからファイル名のマップを読み込む。
     */
    private function load(): void
    {
        $manifest = file_get_contents($this->manifestPath);
        if ($manifest === false) {
            throw new \Exception('ビルドしていない');
        }

        $this->manifest = json_decode($manifest, true);
    }

    /**
     * 指定したエントリーポイント名に紐づく実ファイル名を返す。
     *
     * @param string $name
     * @return string
     */
    public function get(string $name): string
    {
        if ($this->manifest === null) {
            $this->load();
        }

        if (!isset($this->manifest[$name])) {
            throw new \Exception("マニフェスト存在しないエントリーポイント名が指定された（{$name}）");
        }

        return $this->manifest[$name];
    }
}
